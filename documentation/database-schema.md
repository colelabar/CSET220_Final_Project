Retro-Chat Database Schema Documentation
========================================

## Overview
-----------

The Retro-Chat system was originally built with one database table and schema, but once the visualizations came into play I needed to make another. The final schema is below.

## Users Table
--------------

**ID**: The ID is generated by Sequelize using a UUID system, ensuring uniqueness for each user.

**EMAIL**: The email, provided by the user on registration, must be unique in the DB and is typed as a string.

**USERNAME**: Username entered by the user on registration, and must also be unique in the DB. Typed as a string.

**PASSWORD**: The user password is stored as a string, while the user input itself runs through a BCrypt hashing encryption upon entry before it is sent to the DB.

**ROLE**: Typed as an integer, the role is used on token check during login and on page load to verify whether or not to display administration privileges to the user.

**ISFLAGGED**: Boolean field that is the sole basis for whether or not a user is banned from using the system. Administrators can change the value of this field in the admin portal for each user.


## Messages Table
-----------------

**ID**: Unlike the User ID field, the message ID as an integer auto-increments starting from 0 instead of using a UUID to better organize and structure the messages in the DB. It must be unique to prevent any issues in the DB Store.

**USERNAME**: Since users can post multiple messages, the username is not unique, and is simply a signature on the message. Stored as a string type.

**MESSAGE**: Similar to the username, the message is stored as a string and doesn't need to be unique. It takes the message value as it is.

**CREATEDAT**: Despite Sequelize creating this field by default, for the visualization aspect I manually defined its use to better aid in my data manipulation.
