When using the SDK, you will notice that a couple of configuration files are being created:

1. The `zeysdk.package.json` contains metadata and other relevant information on the application itself
2. The `zeysdk.assets.json` contains metadata about the individual assets of the application
3. The `zeysdk.sync.json` contains asset synchronization states in regards to the linked ZeyOS instance

We highly recommend using the SDK's interface to change those files and refrain from editing them directly.

However, in some cases you might want to automate certain tasks through additional
scripts and task runners - in such cases it is certainly useful to have a better
understanding about the underlying file structure and properties.

**BE CAREFUL WHEN MANIPULATING THE SYNC STATES, YOU ARE PUTTING YOUR SYSTEM INTEGRITY AT RISK!**
