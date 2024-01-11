The **ZeyOS Authentication API** allows you to authenticate ZeyOS users.

You may access the ZeyOS Authentication API via `https://cloud.zeyos.com/{INSTANCE}/auth/v1/`.

Creating an authentication token is the prerequisite to working with the [ZeyOS Standard REST API](../api). Check out the [Getting Started Guide](../api) in the Standard REST API documentation first, it will make your life easier!

The ZeyOS Authentication API may also be extremely useful if you simply want to use ZeyOS as an authentication provider for external applications, e.g. for single sign-on.


### Return Values and Error Handling

The ZeyOS Authentication API currently only returns JSON data and an HTTP status code indicating the outcome of a request.

HTTP status code 200 or 201 are used to indicate a successful response, and the result will be a **JSON object**.

When an error occurs, the HTTP status code will be 400 or greater, and the response will be a **text message**.

We recommend that you treat any HTTP status code greater than or equal to 400 as an error.


### Creating Authentication Tokens

```bash
$ curl -i --data 'name=max.power&password=MySecretPwd&identifier=MyDevice' https://cloud.zeyos.com/demo/auth/v1/login

HTTP/2 200
server: nginx
date: Thu, 19 Apr 2018 08:56:20 GMT
content-type: application/json
cache-control: no-cache
expires: Fri, 29 Aug 1997 07:14:00 GMT
access-control-allow-origin: *
strict-transport-security: max-age=31536000

{"user":2,"application":null,"token":"a749717494cf42aa2fcb7533a950e2a7350d1086","identifier":"MyDevice","expdate":null}
```

In this example, we are simply authenticating a user via `name` and `password` (`name` may refer to `username` or `email`).

Tokens are linked to *identifiers* which should be specific to both the accessing app and device.
This allows devices to renew their tokens independently.

You can also see that the HTTP response code for a successful login is `200`.
If username or password are wrong, the server will return `401`. So always check the response code.

### Using application-specific Tokens with the ZeyOS Standard REST API

**In case you want to use the [ZeyOS Standard REST API](../api), you will need to generate an application-specific authentication token.**

The first thing you need to do is create an application in ZeyOS. In ZeyOS, go to **Enhancements** and create a new application:

![Create App](../../../../../static/img/createapp.gif)

Write down the `appsecret` as **it will be displayed only once when creating the application and should be treated like a password.**

**Note**: In case you loose the `appsecret`, you can go to the application details and regenerate a new `appsecret`. All existing tokens that have been signed with the old `appsecret` will remain valid.

The purpose of the `appsecret` is to sign authentication tokens so that they can be used with the [ZeyOS Standard REST API](../api).
This gives system administrators control over which applications may actually be allowed to use the ZeyOS Standard REST API.
If an application is deactivated or removed, all issued authentication tokens are rendered invalid.

```bash
$ curl -i --data 'name=max.power&password=MySecretPwd&identifier=MyDevice&appsecret=ff55c5095a126d66faaa37cd71bc771672c56ec5' https://cloud.zeyos.com/demo/auth/v1/login
```

Response:

```json
{
  "user": 2,
  "application": 343,
  "token": "a749717494cf42aa2fcb7533a950e2a7350d1086",
  "identifier": "MyDevice",
  "expdate": null
}
```

And voilà, you have obtained an application-specific authentication token that can now be used with the [ZeyOS Standard REST API](../api).

### Validate Authentication Token

If you want to check if a authentication token is still valid, you can simply check your current session, for example:

```bash
curl -i -X GET -H 'Authorization: Bearer a749717494cf42aa2fcb7533a950e2a7350d1086' https://cloud.zeyos.com/demo/auth/v1/
```

### Using autentication Tokens with custom REST APIs

Besides using the [ZeyOS Standard REST API](../api) you can also use [iXML to create custom REST APIs](../ixml/#rest:server).
In this case, you can decide whether you want to use ZeyOS's token mechanism to authenticate users
or if you want to use a static access key (or no authentication at all).

To check wheter the API request includes a valid authentication header, you can simply
check if the `AUTH` variable is set.

Let's say we want to have a custom API called `checkout` that simply returns the infos about the user:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE ixml SYSTEM "https://developers.zeyos.com/schema/ixml.dtd">
<ixml>

<!-- Check if the user is authorized -->
<is var="AUTH.user" type="non-valid">
  <header>HTTP/1.1 403 Forbidden</header>
  <exit/>
</is>

<output>User ID $AUTH.user is authorized!</output>

<!-- Check if the user token has an expiration date -->
<if value1="$AUTH.expdate" func="!=">
  <output>Expiry date:</output>

  <output>
    <date:format format="Y-m-d H:i">$AUTH.expdate</date:format>
  </output>
</if>

</ixml>
```

Example request:

```
curl -i -X GET -H 'Authorization: Bearer a749717494cf42aa2fcb7533a950e2a7350d1086' https://cloud.zeyos.com/demo/remotecall/checkauth
```
