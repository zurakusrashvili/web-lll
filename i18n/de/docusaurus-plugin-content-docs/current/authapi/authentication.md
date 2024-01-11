---
title: "Authenticaiton"
---


The ZeyOS REST API is only usable for authenticated users. Authentication is achieved in two ways:

1. For *interal* apps - the *ZeyOS session*: If the user is already logged in to ZeyOS and you are using the REST API within a Weblet, the current ZeyOS session will be used.
2. For *external* apps - obtaining a *session token*

Token authentication relies on ZeyOS's token authentication mechanism, documented in the [Auth API documentation](../auth/).

Once a token has been obtained, you can then use the REST API by including the `Authorization` header in your request with the method indicator `Bearer`, a space, the obtained token string, e.g. `Authorization: Bearer 2a3e4ec88e66138253a69da3406841fccb1c998e`.

Example with CURL:

```bash
$ curl -X POST \
  -H 'Authorization: Bearer a749717494cf42aa2fcb7533a950e2a7350d1086' \
  -d "fields[]=ID&fields[]=lastname&fields[]=firstname&limit=3" \
  https://cloud.zeyos.com/demo/api/v1/contacts/
```

Response:

```json
[{
	"ID": 12198,
	"lastname": "Morris",
	"firstname": "Steve"
}, {
	"ID": 12199,
	"lastname": "Schulz",
	"firstname": "Dirk"
}, {
	"ID": 12200,
	"lastname": "Charlott",
	"firstname": "Sophie"
}]
```
