<div align="center">
    <a href="https://github.com/salvasm/men-api-rest">
        <img src="https://www.salvasm.dev/images/projects/node_api_s.png" alt="Logo">
    </a>
    <h3 align="center">MEN API Rest</h3>
    <p align="center">
        Boilerplate API Rest coded with TypeScript to jumpstart your projects quickly
    </p>
</div>

<!-- TABLE OF CONTENT -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
        <a href="#about-the-project">About The Project</a>
        <ul>
            <li><a href="#built-with">Built With</a></li>
            <li><a href="#what-includes">What Includes</a></li>
        </ul>
    </li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li>
        <a href="#default-configurations">Default configurations</a>
        <ul>
            <li><a href="#routes">Routes</a></li>
            <li><a href="#acl-permissions">ACL Permissions</a></li>
        </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project
There are a lot of ideas I want to apply to practice, learn or just for fun. Most of those projects begin with a user authentication system and some important elements to create, read, update or delete (CRUD). So, I decided to implement what I think are some basics to start those projects in order to avoid to rewrite some code.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- BUILT WITH -->
### Built With
- [MongoDB](https://www.mongodb.com/)
- [ExpressJS](https://expressjs.com/)
- [Node.js](https://nodejs.org/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- WHAT INCLUDES -->
### What Includes
- Basic auth routes
- CRUD class
- jsonwebtoken
- sessions
- ACL
- Error Handling

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->
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
<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROUTES -->
## Routes
- /api
    - /auth
        - POST /login
        - POST /logout
    - /user
        - GET /
        - POST /
        - GET /:id
        - PUT /:id
        - DELETE /:id

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- DEFAULT CONFIGURATIONS -->
## Default Configurations

<!-- ROLES -->
### Roles
Defined in User Model Schema.  
- **admin**
- **user**: *Default for new registered users*
- **guest**: *Default for non authenticated users*

Same roles used by ACL.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACL PERMISSIONS -->
### ACL Permissions

Current applied permissions:  
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
  },
  {
    "group": "user",
    "permissions": [
      {
        "resource": "user/*",
        "methods": ["GET"],
        "action": "allow"
      },
      {
        "resource": "auth/logout",
        "methods": ["POST"],
        "action": "allow"
      }
    ]
  }
]
```
To apply custom permissions just modify ``permission.json`` on config folder.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing
Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

<div align="center">
    <a href="#">
        <img src="https://www.salvasm.dev/images/s_head_black.png" alt="Logo" width="150">
    </a>
    <div align="center">
        <a href="mailto:salvador.sanchez.mendez@gmail.com">Email</a>
        or 
        <a href="https://twitter.com/_salvasm">Twitter</a>
    </div>
</div>

<p align="right">(<a href="#top">back to top</a>)</p>
