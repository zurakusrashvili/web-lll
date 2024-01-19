// copyDocs.js
const fs = require('fs-extra');

const docsSource = './docs';
const docsDestDe = './i18n/de/docusaurus-plugin-content-docs/current';
const docsDestEn = './i18n/en/docusaurus-plugin-content-docs/current';

// Copy docs to German directory
fs.copy(docsSource, docsDestDe, function (err) {
  if (err) {
    console.error('Error copying docs to German localization:', err);
    process.exit(1);
  } else {
    console.log('Docs successfully copied to German localization');
  }
});

// Copy docs to English directory
fs.copy(docsSource, docsDestEn, function (err) {
  if (err) {
    console.error('Error copying docs to English localization:', err);
    process.exit(1);
  } else {
    console.log('Docs successfully copied to English localization');
  }
});
