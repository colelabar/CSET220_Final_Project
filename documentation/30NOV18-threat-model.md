Threat Model
============
As of 30 November 2018
----------------------

## Strengths
------------
  * User friendly & accessible system
  * Authentication is secured using JWT and BCrypt
  * User input is escaped from XSS using DOMPurify

## Weaknesses
------------
  * User roles sent in the request / response headers
  * No message rate-limiting
  * No denial of bot spam due to lack of rate-limiting

## Opportunities
----------------
  * Give users space free from advertisement to chat in a comfortable atmosphere
  * Give users a moderated and safe chat experience

## Threats
----------
  * Malicious persons attempting to gain access to users information
  * Malicious persons attempting to DDoS the system
  * Malicious / advertising bots attempting to sell goods or services using the system
