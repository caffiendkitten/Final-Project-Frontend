# Password Manager Frontend

## Overview
This is the Backend for my final project at Flatiron School. 
This project was inspired for my passion for information security and my interest in software engineering and built over 2.5 weeks. 

This is a password manager that will allow users to save login credentials for sites, create a unique password based on their needs, and check if a password has been found in a breach via HaveIBeenPwnd. 
It uses Bcrypt on the user login and AES encryption on the user saved credentials.

The frontend is currently hosted on Netlifly and the backend is hosted on Heroku.
https://flatiron-passwordmanager.netlify.com/ is the live project for your entertainment.

## Objectives/ User Stories
1. To allow users to be created
2. To not allow users to use the same login name
3. To allow users to create Account Groups
4. To allow users to add Credential Pairs to Account Groups
5. To allow users to delete Credential Pairs from Account Groups
6. To allow users to delete empty Account Groups
7. To allow users to check is a password has been found in HaveIBennPwnd
8. To allow users to create a unique password to their needs with options of numbers and unique characters
9. To allow users to logout and clear their session information
10. To securly store passwords on login
11. To securly store Credential Pairs with AES encryption before being send to the backend.

## Setup
 - Get the backend is cloned and running (see backend for instructions there) 
 - Ensure that your fork and clone this repository
 - Run `npm install` to get the npm package installed or uptodate
 - Run `npm start` and go to the localhost in your browser
  - If you are running the backend API at the same time you will need to open http://localhost:3001 to view it in the browser, or specify a specific port for the json server to run on and the app to run on as they cannot run on the same port.

## Technologies and Libraries Used
 - Javascript
 - CSS
 - React
 - Cryptr
 - AWS Amplify
 - AWS Amplify CLI
 - AWS Amplify React
 - uuid 
 - dotenv

## Streatch Goals/ Ideas to work on
1. Allow users to copy their created unique password into a new Account Group
2. Work on ensuring users cannot input malicious code
3. Make sure the key for each encryption is unique for each users and not accessable
