---
title: Asset management
---

### Usage

* `zeysdk add <ASSET_CLASS>/<FILENAME>` : Add an asset, e.g. `zeysdk add services/test.ixml`
* `zeysdk update <ASSET_CLASS>/<FILENAME>` : Update the asset properites
* `zeysdk remove <ASSET_CLASS>/<FILENAME>` : Remove an assets (will be deleted after sync)
* `zeysdk rename <ASSET_CLASS>/<OLD_FILENAME> <ASSET_CLASS>/<NEW_FILENAME>` : Renames a resource

There are three types of asset classes:

* services
* resources
* weblets

zeysdk add weblets/picklist.ixml --name="Picking List" --type=detached --view=billing.details_transaction


### Options

#### For Services

* `name`: The service name (mandatory)
* `type`: The service type; Options:
	- NULL: No built-in event (default)
  - `timing`: Service is called periodically (requires properties `schedule` and `interval`)
  - `remotecall`: Service is called via remote HTTP request
  - `after_creation`: Triggered after an object is created (requires property `entity`)
  - `before_modification`: Triggered before an object is modified (requires property `entity`)
  - `after_modification`: Triggered after an object is modified (requires property `entity`)
  - `after_creation_modification`: Triggered after an object is created or modified (requires property `entity`)
  - `before_deletion`: Triggered before an object is deleted (requires property `entity`)
  - `after_deletion`: Triggered after an object is deleted (requires property `entity`)
* `schedule`: The daily starting point as *minute of the day* (e.g. 16:30 = 16.5 * 60 = 990); only applicable for type `timing`, defaults to 0:00
* `interval`: The interval *by minute* in which the service should be called (e.g. 10 means every ten minutes); only applicable and mandatory for type `timing`, must be greator than zero
* `entity`: The ZeyOS entity class. For options, see [List of ZeyOS Entities](docs/entities.md); only applicable for types `after_creation`, `before_modification`, `after_modification`, `after_creation_modification`, `before_deletion` and `after_deletion`
* `accesskey`: The security access key; optional and only applicable for type `remotecall`
* `url`: The service URL - can be used when working with external hooks and scripts


#### For Resources

* `name`: The resource name (mandatory)
* `mimetype`: The resource MIME type (mandatory)


#### For Weblets

* `name`: The weblet name (mandatory)
* `type`: The weblet type (mandatory); Options:
  - `integrated`: Weblet will be visible below the ZeyOS menu bar
  - `standalone`: Weblet is standalone and not embedded within the ZeyOS UI
  - `detached`: Weblet is standalone and will be opened in a new tab/window
  - `popup_framed`: Weblet will be display in a popup including title bar. (requires properties `width` and `height`)
  - `popup_plain`: Weblet will be display in a plain popup without title bar. (requires properties `width` and `height`)
  - `embedded_framed`: Weblet will be displayed within an open panel
  - `embedded_collapsed`: Weblet will be displayed within a closed panel
  - `embedded_plain`: Weblet will be display within a plain iframe without enclosing panel
* `view`: The ZeyOS view that the weblet applies to. For options, see [List of ZeyOS Views](docs/views.md)
* `width`: The frame width
* `height`: The frame height
* `url`: The weblet URL - can be used when working with external hooks and scripts


### Examples

Add a new service:

```
zeysdk add services/sendreminder.ixml --name="Send reminders" --type=timing --schedule=360 --interval=60
```

Update the service properties:

```
zeysdk update services/notifycontact.zy --type=after_creation --entity=contacts
```

**Note**: When a service type changes, obsolete properties will be removed from `zeysdk.assets.json`, e.g. in this case `entity` would be removed.

Rename a service:

```
zeysdk rename services/sendreminder.ixml services/notifycontact.zy
```
