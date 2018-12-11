API Route Documentation
=======================

## Overview
-----------

Use this file to explore and investigate the routing handled by the API of the application. It's construction is based off of the [Swagger.io][https://swagger.io/] style of API documentation.

## Routes
---------

### Users
---------

**POST /users/signup**:
This route takes the parameters passed to it from the front-end (email, username, and password) and sends it to the back-end logic to be pushed into the database. On success, the user is redirected to the login page to log in to the system with their new credentials. On error, the logic returns 403 with error.

**POST /users/login**:
The login route takes the users entered parameters and passes it through the API into the back-end logic, which processes it in a multitude of ways. The logic matches the username with the provided username, and on success matches the entered password hash with the stored one. If these two match, BCrypt signs the username with a token and sends it to the cookies for use by the rest of the system. When the process is complete, the user is redirected to the chat channel. There are a number of responses if the process fails, tailored to the type of error encountered.

**GET /users/admin**:
This route checks, on multiple page loads, whether or not the user is an administrator. If the user is an admin, they will see a unique button on the chat channel that allows them to enter the administrator portal. The admin check takes the parameters set by the header and sends them to the back-end to check if the role matches the required level of permission.

**GET /users/list**:
On a successful login, the front-end calls out to the API with a request to get the list of total users on the system's DB. The API hands this request off to the back-end logic to make the database call and return it to the front-end page.

### Admins
----------

**PUT /admin/userban**:
When an admin clicks on the "Ban" button in the admin dashboard, the front-end makes an AJAX call that routes through the API. The API sends this to the back-end logic to changed the "isFlagged" field of the respective user row in the database.

**PUT /admin/userunban**:
When an admin clicks on the "Ban" button in the admin dashboard, the front-end makes an AJAX call that routes through the API. The API sends this to the back-end logic to changed the "isFlagged" field of the respective user row in the database.

**PUT /admin/userpromote**:
Similar to the ban endpoint. When an admin clicks on the "Role+" button in the admin dashboard, the front-end makes an AJAX call that routes through the API. The API sends this to the back-end logic to changed the "role" field of the respective user row in the database to match the required role of admin.

**PUT /admin/userdemote**:
The opposite of the promote endpoint. When an admin clicks on the "Role-" button in the admin dashboard, the front-end makes an AJAX call that routes through the API. The API sends this to the back-end logic to changed the "role" field of the respective user row in the database to strip the user of their admin role and replace it with the standard user role.
