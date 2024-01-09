---
title: Instance login
---

When you work on your application, you will require a ZeyOS platform for testing and development.
For this purpose, you will need to link your application to a ZeyOS instance.
Since you might want to deploy your application on multiple instances, you can also
quickly switch between instances via `zeysdk use`.

Every time you create a new instance, a instance specific configuration file is created as `zeysdk.sync.<instanceid>.json`. The currently active instance configuration is always simply stored as `zeysdk.sync.json`.

Also, for every linked instance, the SDK will create an *app settings file* such as `settings/settings.<instanceid>.json`.


#### Usage

* `zeysdk link <INSTANCE_ID> --url=<URL>` : Create/update a platform link
* `zeysdk unlink <INSTANCE_ID>` : Remove a platform link
* `zeysdk use <INSTANCE_ID>` : Switch between platform links
* `zeysdk whoami` : Show information about the active platform link

#### Options

* `--url`: The ZeyOS URL; if no URL is supplied, the default URL is `https://cloud.zeyos.com/<INSTANCE_ID>/`
* `--user`: The ZeyOS user name or e-mail (case-insensitive)
* `--password`: The user's password
