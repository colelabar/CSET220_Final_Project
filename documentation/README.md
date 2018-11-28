Node & Express Chat Application
===============================

## Background
-------------

For my third semester of Software Development instruction at Thaddeus Stevens College of Technology, I was assigned the task of creating a full-fledged application as my final project. Starting with nothing but a [Pusher tutorial](https://pusher.com/tutorials/secure-chat-javascript) and a set of requirements, I set off on one of the most difficult coding challenges I'd faced yet.

## The Requirements
-------------------

1. Create a database with tables to store your data structure

2. Create a well structured web interface and backend api to power your project

3. Frontend component

4. Backend component

5. Administration Portal

6. Data Analysis & Visualizations

7. API Implementation

8. Data Architecture

## The Process
--------------

1. I started by running through the tutorial on the Pusher website, which went relatively smoothly until I realized the Authentication system that was "recommended" by it was lacking in the localized-database department.

2. To ensure my authentication system was unmarred by the creation of the tutorial, I started a new repo and constructed my authentication from there. Utilizing tools like PassportJS and JWT, as well as spending countless hours determining the structure of the auth system eventually led to it's completion. Steps in this trial were:
  * Creating the MySQL database with my pre-determined user model
  * Creating endpoints for authentication
  * Testing the endpoints in Postman to ensure backend - database communication was valid
  * Create static pages and functionality for users to login and signup
