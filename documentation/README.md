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

2. To ensure my authentication system was unmarred by the creation of the tutorial, I started a new repo and constructed my authentication from there. Utilizing tools like PassportJS and JWT, as well as spending countless hours determining the structure of the auth system eventually led to its completion. Steps in this trial were:
  * Creating the MySQL database with my pre-determined user model
  * Creating endpoints for authentication
  * Testing the endpoints in Postman to ensure backend <-> database communication was valid
  * Create static pages and functionality for users to login and signup

3. Once my authentication system was complete, I restarted the Pusher tutorial "on top" of my authentication. The integration of these two systems together proved incredibly difficult, stemming from the authentication tokens and user roles I had created being the basis for the chat system's users. Along the way of integration, a few notable accomplishments were made:
  * The application was styled and made to be much more user friendly
  * A stand-in template for the future administration panel was created, along with associated buttons
  * The implementation of JQuery on-click handlers for form submittal and message sending

4. After the basic functionality and styling of the application was finalized and working (Read: Fully armed and operational battlestation), I felt it appropriate to begin working on the administration features for it. This included the creation of an admin dashboard and a more complex user role system based on the user model defined in Step 2. The administration portal allows a user (with admin privileges) to promote a user to admin, demote an admin to a standard user, and ban a user. I created a system of badges to clearly identify banned and admin users.

## Data Analysis Life Cycle
---------------------------

1. Discovery / Requirements
  * Despite the project's literal classroom requirement to contain data visualizations that follow the DALC, as the application was under construction I began to see the feasibility and usability of such visual interpretations of data. Admins, for example, could use a chart of the "hot spot" time periods where users are more active on the system to determine times when more prevalent moderation may be necessary. This is what I decided to focus on: the visualization of messages over the course of a few days to give administrators another tool for their toolbox, so to speak.

2. Collection
  * The application was originally designed as a "fire and forget" system, where a user's chats were only as persistent as long as there was a connection to the chat room. This idea quickly became incompatible with my desired visualization, seeing as there was no way to pull the message information without storing it somewhere. I designed a Message model in my database and created an AJAX call to query for all messages.

3. Data Prep / Cleaning
  * Most of the message data was useless to me, such as the username of the author and the content of the message itself. I was only interested in the time of the message's creation in the database. Later steps of the DALC would allow me to access these parameters, leaving most of this stage to ensure no duplicates or anomalous posts were found in the system.

4. Exploration / Planning
  * I began to think about how I wanted the data to be visualized, ultimately deciding that it should be expressed in a line-graph style to quickly and accurately identify trends with little to no effort. This would require the conversion of the "CreatedAt" field of the message model to a usable time, and then create some algorithms to convert and combine data points into more broad ranges for the visual representation.

5. Modeling / Algorithms
  * This step proved to be the most difficult of the series, requiring several cases of heavy thought for converting the "CreatedAt" field into something more usable by the math functions I created. I ended up creating several arrays to iterate through and house my datasets, and slicing the "createdAt" field down to usable portions. This allowed me to (in an ugly way) map out the messages-per-hour sent through the chat system.

6. Automation / Computation
  * Now that most of the mathematical portions were complete and the data was ready to be molded into the form I wished it to take, I could begin constructing my charts. While I had originally planned to use a system such as D3JS to accomplish the task of visualizing, I came across ChartJS in dealings with my classmates. This easy-to-use charting system took the JSON I fed to it and spit out a beautiful looking line graph.

7. Findings / Review
  * Though it was expected, the results were interesting to see. Most of the messages sent through the system were sent in the morning between 9AM and 11AM. As stated previously, this isn't super surprising due to the fact that it's when the CSET class is in session, and when I'm most likely to have others assist in testing the system and sending data.
