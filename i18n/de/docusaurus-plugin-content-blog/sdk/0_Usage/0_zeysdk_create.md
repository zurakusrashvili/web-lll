---
title: Creating a new application
---

#### Usage

* `zeysdk create <APP_IDENTIFIER> --name=<NAME>`

#### Description

Creates a new ZeyOS application manifest and creates the application's directory structure:

```text
/<APP_IDENTIFIER>
 |- /resources
 |- /services
 |- /settings
 |  |- defaultsettings.json
 |  |- settingscode.ixml
 |  |- usersettingscode.ixml
 |- /weblets
 |- zeysdk.assets.json
 |- zeysdk.package.json
 |- zeysdk.sync.json
```
