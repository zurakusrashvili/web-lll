const fs = require('fs-extra');
const xml2js = require('xml2js');
const path = require('path');

// Initialize parser and builder with the desired options
const parser = new xml2js.Parser({
    explicitArray: true,
    charkey: "_",
    attrkey: "$",
    explicitCharkey: true,
    normalizeTags: true,
});
const builder = new xml2js.Builder({
    headless: true,
    renderOpts: {
        'pretty': true,
        'indent': '    ',
        'newline': '\n'
    },
    cdata: true
});

// Function to convert a namespace to MDX
async function convertNamespaceToMDX(namespace, namespaceTitle, baseDirPath) {
    // Ensure the directory for the namespace exists
    const zeyosPattern = /\(ZeyOS\)/g;

    const dirPath = path.join(baseDirPath, namespaceTitle.replace(zeyosPattern, ''));
    await fs.ensureDir(dirPath);

    // Process each command within the namespace
    const commands = namespace.command || [];
    commands.forEach(command => {
        const commandName = command.$.name;
        const commandTitle = command.$.title;

        // Regular expression to match the exact substring "(ZeyOS)" including the parentheses
        const zeyosPattern = /\(ZeyOS\)/g;

        // Replacing "(ZeyOS)" with an empty string, and then removing any other invalid filename characters
        const sanitizedTitle = commandTitle.replace(zeyosPattern, '').replace(/[<>:"/\\|?*]+/g, '-').trim();

        const fileName = `${sanitizedTitle}.mdx`;
        const filePath = path.join(dirPath, fileName);

        let mdxContent = `# ${commandTitle}\n\n`;

        // Generate and add the Anatomy section to the mdxContent
        if (commandName && command.attributes) {
            mdxContent += generateAnatomySection(command);
        }

        // Handle <parents>
        if (command.parents && command.parents[0] && command.parents[0].parent) {
            const parentNames = command.parents[0].parent
                .map(p => p._ || p)
                .filter(Boolean)
                .join(', ');
            mdxContent += parentNames.length ? `**Parents**: ${parentNames}\n\n` : '';
        }
        delete command.parents;

        // Handle <description>
        if (command.description) {
            const descriptions = command.description.map(desc => typeof desc === 'object' ? desc._ : desc).join('\n\n');
            mdxContent += descriptions.length ? ` **Description**:\n ${descriptions}\n\n` : '';
            delete command.description
        }
        // Handle <attention>
        if (command.attention) {
            const attentionText = command.attention.map(attn => attn._).join('\n\n');
            mdxContent += attentionText.length ? `\n> **Attention:**\n>\n> ${attentionText.replace(/\n/g, '\n> ')}\n\n` : '';
        }
        delete command.attention;

        // Handle <content> if type is "ixml"
        if (command.content && command.content[0] && command.content[0].$.type) {
            mdxContent += `### Content: ${command.content[0].$.type}\n\n` + '```xml\n' + `<content type="${command.content[0].$.type}"/>` + '\n```\n\n';
        }
        delete command.content;


        // Handle <attributes>
        if (command.attributes && command.attributes[0] && command.attributes[0].attribute) {
            mdxContent += `**Attributes**:\n\n`;
            mdxContent += `| Name | Type | Description | Defined By |\n`;
            mdxContent += `| ---- | ---- | ----------- | ---------- |\n`;

            command.attributes[0].attribute.forEach(attr => {
                const name = attr.$.name;
                const type = attr.$.type;
                const description = attr.$.title || '';
                const definedBy = commandName;
                mdxContent += `| ${name} | ${type} | ${description} | ${definedBy} |\n`;
            });

            mdxContent += '\n\n';
        }
        delete command.attributes;

        // Handle <results>
        if (command.result) {
            mdxContent += `**Results**:\n\n`;
            mdxContent += `| Binding | Type | Predicate |\n`;
            mdxContent += `| ------- | ---- | --------- |\n`;

            command.result.forEach(result => {
                const binding = result.$.binding || '';
                const type = result.$.type || '';
                const predicate = result.$.predicate || 'N/A'; // Using 'N/A' for non-existent predicate
                mdxContent += `| ${binding} | ${type} | ${predicate} |\n`;
            });

            mdxContent += '\n\n';
        }
        delete command.result


        // Children Section
        if (command.children && command.children[0] && command.children[0].child) {
            mdxContent += `## Children\n\n`;
            command.children[0].child.forEach(child => {
                const childName = child.$ && child.$.name ? child.$.name : 'Unknown Child';
                const childAnatomyName = child.$ && child.$.title ? `Anatomy of ${child.$.title}` : 'Unknown Anatomy';

                mdxContent += `<details>\n`;
                mdxContent += `<summary>${childName}</summary>\n\n`;
                mdxContent += `### ${childAnatomyName}\n`;
                mdxContent += '```xml\n';
                mdxContent += `<${childName}`;

                if (child.attributes && child.attributes[0] && child.attributes[0].attribute) {
                    child.attributes[0].attribute.forEach(attr => {
                        const name = attr.$.name;
                        const type = attr.$.type;
                        mdxContent += ` ${name}="${type}"`;
                    });
                }

                const selfClosingTag = !(child.content && child.content[0]) && !(child.attributes && child.attributes[0] && child.attributes[0].attribute.length > 0);
                mdxContent += selfClosingTag ? '/>' : '>';

                if (child.content && child.content[0]) {
                    mdxContent += `${child.content[0].$.type}`;
                }

                if (!selfClosingTag) {
                    mdxContent += `</${childName}>`;
                }

                mdxContent += '\n```\n\n';

                if (child.description) {
                    mdxContent += `**Description:**\n\n`;
                    mdxContent += `${child.description[0]._}\n\n`;
                }

                if (child.attributes && child.attributes[0] && child.attributes[0].attribute) {
                    mdxContent += `**Attributes**:\n\n`;
                    mdxContent += `| Name | Type | Description |\n`;
                    mdxContent += `| ---- | ---- | ----------- |\n`;

                    child.attributes[0].attribute.forEach(attr => {
                        const name = attr.$.name;
                        const type = attr.$.type;
                        const description = attr.$.title || '';
                        mdxContent += `| ${name} | ${type} | ${description} |\n`;
                    });
                    mdxContent += `\n`;
                }

                if (child.content && child.content[0]) {
                    const contentType = child.content[0].$.type;
                    const contentTitle = child.content[0].$.title || 'Content';
                    mdxContent += `**${contentTitle}: Code (${contentType})**\n\n`;
                    mdxContent += '```xml\n';
                    mdxContent += `<content type="${contentType}"/>\n`;
                    mdxContent += '```\n\n';
                }

                mdxContent += `</details>\n\n`;
            });
        }

        // ... rest of your script ...


        // Handle <examples>
        if (command.example) {
            mdxContent += `## Examples\n\n`;

            command.example.forEach(example => {
                const title = example.$ && example.$.title ? example.$.title : 'Example';
                let exampleContent = example._ ? example._ : '';

                // Detect the indentation of the first non-empty line
                const firstNonEmptyLineIndent = exampleContent.split('\n')
                    .find(line => line.trim() !== '')
                    ?.match(/^(\s*)/)[0].length;

                // Adjust indentation based on the first line's indentation
                if (firstNonEmptyLineIndent !== undefined) {
                    const lines = exampleContent.split('\n').map(line => {
                        // For non-empty lines, remove the first line's indentation
                        if (line.trim() !== '') {
                            return line.substring(firstNonEmptyLineIndent);
                        }
                        // Keep empty lines as is
                        return line;
                    });
                    exampleContent = lines.join('\n');
                }

                // Trim the content to remove extra empty lines at the start and end
                exampleContent = exampleContent.trim();

                mdxContent += `### Example: ${title}\n\n`;
                mdxContent += '```xml\n';
                mdxContent += `${exampleContent}\n`;
                mdxContent += '```\n\n';
            });
        }

        delete command.example;







        // Build the XML string for the rest of the command content
        // const xmlString = builder.buildObject({
        //     command
        // }).trim();
        // mdxContent += '```xml (Without rendering)\n' + xmlString + '\n```\n\n';

        // Write the MDX content to file
        fs.writeFileSync(filePath, mdxContent);
    });
}

const generateAnatomySection = (command) => {
    let anatomy = '### Anatomy\n\n' + '```xml\n';
    anatomy += `<${command.$.name}`;

    // Add attributes to the command's anatomy string
    if (command.attributes && command.attributes[0] && command.attributes[0].attribute) {
        command.attributes[0].attribute.forEach(attr => {
            const name = attr.$.name;
            const type = attr.$.type;
            anatomy += ` ${name}="${type}"`;
        });
    }

    // Open tag if there are children or content, otherwise self-close
    anatomy += command.children && command.children[0] && command.children[0].child.length > 0 ||
        command.content && command.content[0] ? '>' : '/>';

    // Include content if it exists
    if (command.content && command.content[0]) {
        anatomy += `\n    ${command.content[0].$.type}`;
    }

    // Add children within the command tag
    if (command.children && command.children[0] && command.children[0].child) {
        command.children[0].child.forEach(child => {
            const childName = child.$ && child.$.name ? child.$.name : 'Unknown Child';
            anatomy += `\n    <${childName}`;

            if (child.attributes && child.attributes[0] && child.attributes[0].attribute) {
                child.attributes[0].attribute.forEach(attr => {
                    const name = attr.$.name;
                    const type = attr.$.type;
                    anatomy += ` ${name}="${type}"`;
                });
            }

            // Close child tag if there is no content, otherwise add content and close
            anatomy += child.content && child.content[0] ? `>${child.content[0].$.type}</${childName}>` : '/>';
        });
    }

    // Close the main command tag if there were children or content
    if ((command.children && command.children[0] && command.children[0].child.length > 0) ||
        (command.content && command.content[0])) {
        anatomy += `\n</${command.$.name}>`;
    }

    anatomy += '\n```\n\n';
    return anatomy;
};



// Main function to convert XML to MDX, handling multiple namespaces
async function convertXMLToMDX(xmlFilePath) {
    try {
        // Read XML content from file
        const xmlContent = fs.readFileSync(xmlFilePath, 'utf8');
        // Parse XML content to JavaScript object
        const result = await parser.parseStringPromise(xmlContent);

        // Accessing the array of namespace elements
        const namespaces = result.ixmldoc.namespace;

        // Iterate over each namespace
        for (const namespace of namespaces) {
            // Extracting title from namespace, with a fallback default title
            const namespaceTitle = namespace.$.title || 'Default Namespace Title';
            const baseDirPath = path.join(__dirname, '..', '..', 'docs', 'ixml');

            // Convert each namespace to MDX
            await convertNamespaceToMDX(namespace, namespaceTitle, baseDirPath);
        }

        console.log('Conversion to MDX completed for all namespaces.');
    } catch (err) {
        console.error('Error during XML to MDX conversion:', err);
    }
}


// Path to the XML file to be converted
const xmlFilePath = path.join(__dirname, 'ixmldoc.xml');


// Start the conversion process
convertXMLToMDX(xmlFilePath);