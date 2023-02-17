# Water Railway Mesuem Tour Guide

# STUDENTS
- Tochukwu Ozurumba: A00258497
- 

## Instructions
- Clone repo on your local machine
- Ensure you have nodejs v16 and above on your system
- run ```npm install`` to install node_modules for this application
- create a .env file on the root folder
- add the following to the .env file
    ```
      PRO_URL=postgres://fnenrgaf:2hILnfR32-zXaf4HllPltYJKpQE39RKp@hansken.db.elephantsql.com/fnenrgaf
      DATABASE_URL_DEV=postgres://fnenrgaf:2hILnfR32-zXaf4HllPltYJKpQE39RKp@hansken.db.elephantsql.com/fnenrgaf
      DATABASE_URL_TEST=postgres://postgres:postgres@localhost:5432/
      PORT=3000
      TIMEOUT=50000
      SECRET=oiuhkyj908765gvhbjnkml87y
    ```
- then run ``` npm run start:dev``` to start the local server
-  Incases you dont want to run the local server, you can use the link deploy on azure app services, https://ischeduleapp.herokuapp.com/api/v1 to call the apis

- Last Notification system was installed on using NODEMAILER.
