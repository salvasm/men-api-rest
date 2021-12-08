# Node.js API Rest
API Rest boilerplate

## Built With
- Node.js
- Express
- MongoDB


## Integrated
- Basic auth routes
- CRUD class
- jsonwebtoken
- sessions
- ACL
- Error Handling

## Getting Started
1. Install MongoDB
2. Clone the repo:
```
git clone https://github.com/salvasm/node-api-rest.git
```

3. Install NPM packages:
```
npm install
```

4. Build and run server command:
```
npm run build && npm run start
```

## Routes
- /api
    - /auth
        - POST /authentication
        - POST /logout
    - /user
        - GET /
        - POST /
        - GET /:id
        - PUT /:id
        - DELETE /:id

## ACL Permissions
Schema roles:
- admin
- user
- guest (default)

Default applied permissions
```
[
  {
    "group": "admin",
    "permissions": [
      {
        "resource": "*",
        "methods": "*",
        "action": "allow"
      }
    ]
  }
]
```
To apply custom permissions just modify [permission.json](https://github.com/salvasm/node-api-rest/blob/master/src/config/permissions.json) on config folder.
## License
Distributed under the MIT License. See LICENSE for more information.

## Contact
Please, if you find some bug or improvement don't esitate to [contact me](salvador.sanchez.mendez@gmail.com).

... or you can also make a PR [on the project](https://github.com/salvasm/node-api-rest/pulls)
