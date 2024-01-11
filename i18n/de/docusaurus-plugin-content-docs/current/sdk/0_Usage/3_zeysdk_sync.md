---
title: Synchronization
---

### Usage

* `zeysdk compare [<ASSET_CLASS>/<FILENAME> ...]`
* `zeysdk sync [<ASSET_CLASS>/<FILENAME> ...]`
* `zeysdk push [<ASSET_CLASS>/<FILENAME> ...]`
* `zeysdk pull [<ASSET_CLASS>/<FILENAME> ...]`

### Options

* `compare`: Only compares local assets with remote assets on the server side; no changes will be made
* `sync`: Newer assets will replace older assets, both locally and on the server side
* `push`: Push local changes to the server; remote state will be overwritten
* `pull`: Pull remote changes from the server; local state will be overwritten


### Conflict Management

If a conflict arises, the SDK will offer you to create a set of files with the suffix `.mine`
and `.theirs` so that you can use an external merge application to differentiate and resolve the conflict.
