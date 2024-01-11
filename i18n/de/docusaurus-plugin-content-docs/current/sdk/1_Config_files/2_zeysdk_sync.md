---
title: "The ZeyOS Sync File: zeysdk.sync.json"
---

> YOU SHOULD NEVER MODIFY THIS FILE MANUALLY!!!

The `zeysdk.sync.json` file is created whenever you are syncing an application with a ZeyOS instance.

The instance configuration stores the authentication information when executing `zeysdk link <INSTANCE_ID>`. By using `zeysdk use <INSTANCE_ID>` a user can switch between different instances.

Example

```json
{
  "id": "sdkdemo",
  "url": "https://cloud.zeyos.com/sdkdemo/",
  "user": 2,
  "application": null,
  "token": "ee0b44835f52cfe8a53c46f963f9badb2cc8eaa9",
  "identifier": "ZeySDK",
  "expdate": null,
  "syncstates": {
    "settings": {
      "hash": "9p843rsdufh983f98ef",
      "lastmodified": 4389574398534435
    },
    "defaultsettings": {
      "hash": "9p843rsdufh983f98ef",
      "lastmodified": 4389574398534435
    },
    "services": {
      "api": {
        "hash": "9p843rsdufh983e78sf",
        "lastmodified": 4389574398534435
      }
    },
    "resources": {
      "test": {
        "hash": "9p843rsdufh983f98ef",
        "lastmodified": 4389574398534435
      },
      "template": {
        "hash": "9p843rsdufh983e78sf",
        "lastmodified": 4389574398534435
      }
    },
    "weblets": {}
  }
}
```

As you can see in the example, the file consists of two core sections:

1. The connection settings, including token, URL, etc.
2. The sync states for settings, services, resources and weblets

The connection consisting of the platform URL and the authentication token.
Those settings are being updated, whenever you run `zeysdk link` in your application
directory.

The sync states for settings, resources, services and weblets consist of the
file name and the sync state on the server.
The `lastmodified` property is the timestamp of the last modification date.
The `hash` value is the hash of the file contents.

If the `lastmodified` and `hash` properties are empty, it means that the sync state is unknown,
e.g. when an new file has been created. In our example, the service `api` has no sync state on the server.

This could lead to the following situations when syncing:

* The file *does not exist* on the server - in this case it will be created
* The file *exists* on the server - this would lead to a **conflict**
  - The file can be *replaced on the client* (Resolution method: *theirs*)
  - The file can be *replaced on the server* (Resolution method: *mine*)

If the `lastmodified` and `hash` properties exist, it will be compared with the server's current state.
This could lead to the following situations when syncing:

* The file *does not exist on the server* - this would lead to a **conflict**
  - The file can be *removed on the client* (Resolution method: *theirs*)
  - The file can be *created on the server* (Resolution method: *mine*)
* The file *exists on the server* and `lastmodified`/`hash` *does not equal the last known
  sync state* - this would lead to a **conflict**
  - The file can be *replaced on the client* (Resolution method: *theirs*)
  - The file can be *replaced on the server* (Resolution method: *mine*)
* The file *exists on the server* and `lastmodified`/`hash` *equals the last known
  sync state* - in this case, the file will be copied to the server.
