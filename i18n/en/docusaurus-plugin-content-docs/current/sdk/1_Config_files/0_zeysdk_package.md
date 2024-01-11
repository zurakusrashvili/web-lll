---
title: "The Application Manifest File: zeysdk.package.json"
---

The `zeysdk.package.json` describes the application's properties

```json
{
  "identifier": "mydemoapp",
  "signature": "fhe734e9feznc94zm9",
  "name": "Demo Application",
  "description": "A sample ZeyOS application",
  "author": {
    "name": "ZeyOS GmbH & Co. KG",
    "email": "info@zeyos.com",
    "id": "zeyos",
    "homepage": "https://www.zeyos.com"
  },
  "repository": "https://github.com/zeyosinc/sdkdemo.git"
}
```

The manifest file consists of the following sections:

### Application identifier

The `identifier` property also defines the applications namespace.

### Application signature

The `signature` is for all apps that are approved and sigend by ZeyOS.

### Name and description

Simply put a short descriptive `name` (< 64 characters) and `description` (< 512 characters) in here.

### Author information

Your company name, e-mail, author ID (if registered with ZeyOS), homepage

### Repository

Link to the Git repository
