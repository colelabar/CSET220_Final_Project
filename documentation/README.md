Retro Chat Application
======================

## Background
-------------

For my third semester of Software Development instruction at Thaddeus Stevens College of Technology, I was assigned the task of creating a full-fledged application as my final project. Starting with nothing but a [Pusher tutorial](https://pusher.com/tutorials/secure-chat-javascript) and a set of requirements, I set off on one of the most difficult coding challenges I'd faced yet.

## Approach Statement
---------------------

This project, through its many iterations, was built using a variety of languages and techniques. At the time of deployment, the application was built in Node.js for the back-end. This is partially due to the Pusher tutorial basing its structure on Node, and partially due to my preference to using JS for my current projects. The middleware components were built in Express.js, another JS framework that initially proved confusing. I quickly picked up the documentation for Express and it started running much more smoothly. The database store I chose was MySQL, something that surprised many of my NoSQL classmates due to its rigid structure. This DB Store allowed quick spin-up and an easy transition once my routes became built. I built the front-end components using static HTML and CSS (I prefer the precision of custom styling over bootstrap nonsense), with a portion of JQuery handlers for button-clicks and event listeners.

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
  * Testing the endpoints in Postman to ensure backend <-> database communication was valid
  * Create static pages and functionality for users to login and signup

3. Once my authentication system was complete, I restarted the Pusher tutorial "on top" of my authentication. The integration of these two systems together proved incredibly difficult, stemming from the authentication tokens and user roles I had created being the basis for the chat system's users. Along the way of integration, a few notable accomplishments were made:
  * The application was styled and made to be much more user friendly
  * A stand-in template for the future administration panel was created, along with associated buttons
  * The implementation of JQuery on-click handlers for form submittal and message sending
