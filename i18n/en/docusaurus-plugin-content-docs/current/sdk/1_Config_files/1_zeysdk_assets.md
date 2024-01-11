---
title: "The Application Assets File: zeysdk.assets.json"
---

> YOU SHOULD NEVER MODIFY THIS FILE MANUALLY!!!

The `zeysdk.assets.json` represents the properties of all included assets, for example

```json
{
  "services": {
    "api": {
      "mimetype": "text/x-zymba",
      "type": "remotecall",
      "accesskey": "orhf984ht48"
    },
    "check_contact": {
      "mimetype": "application/ixml+xml",
      "type": "after_modification_creation",
      "entity": "contacts"
    }
  },
  "resources": {
    "test": {
      "mimetype": "application/ixml+xml"
    },
    "template": {
      "mimetype": "text/html"
    }
  },
  "weblets": {
    "chart": {
      "mimetype": "application/ixml+xml",
      "type": "popup_framed",
      "width": 500,
      "height": 400
    }
  }
}
```
