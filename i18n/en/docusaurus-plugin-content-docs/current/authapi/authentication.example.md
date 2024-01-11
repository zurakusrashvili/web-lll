##### Obtaining a login token with CURL

```bash
$ curl -X POST -i --data 'name=max.power&password=MySecretPwd&identifier=MyDevice&appsecret=ff55c5095a126d66faaa37cd71bc771672c56ec5' https://cloud.zeyos.com/demo/auth/v1/login
```

Response:

```json
{
  "user": 2,
  "application": 345,
  "token": "a749717494cf42aa2fcb7533a950e2a7360d1086",
  "identifier": "MyDevice",
  "expdate": null
}
```
