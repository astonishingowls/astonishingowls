# astonishingowls
# Greenfield Project

What’s in these files?

- Two primary sections: client-side architecture and server-side architecture
    - Client side: driven by Angular module
        - App folder:
            - App.js houses routing mechanism for directing between pages (uses Angular-router)
            - Auth Repository
                - Controller for authorization for login, logout and register
                - Login.html - login view
                - Register.html - register view
            - Factory_functions - factory.js file that houses the primary functions used throughout the Angular module
            - Dashboard Repository
                - Dashboard.html - houses all of the code on the dashboard
                - Dashboard.js - controllers for all of the dashboard functions (including charts, search and saved searches)
        - Assets folder - images and Chart.min.js, which needed to be hardcoded
        - CSS/SASS folders
            - This works such that you never touch the .css file, only make changes in scss files
            (which are broken down by component and what they do)
            - When you run gulp, it will compile the scss files into the css file
            - If you make style changes, you will need to rerun b/c browser sync was not fully set up
        - Lib - Angular dependencies referenced through Bower
    - Server / database side - Node/Express/Mongo
        - Server.js - serves up the node server using Express/Node
        - Database:
            - db.js - connects to the mLabs on Heroku using mongoose
                - You will need to set up your own Heroku and own mlabs if you want access to the database
            - dbmodels.js - defines User schema and adds SearchArray here
        - Config directory that houses utility methods shared on the server side
            - Api Key - where you should put your API key
            - Api Router - Api calls
            - Routes - all authorization functions on server side

Installing dependencies and Getting Started

- run “npm install” - all node dependencies are listed in package.json
- run “bower install” - all client dependencies are listed in the bower.json
- In a separate tab in the terminal, run “mongod” to start mongo up
- run “gulp” to start our server and app

API: Open exchange rates api receives current and past foreign currency rate

- Website: openexchangerates.org
    - Open Exchange Rates provides a simple, lightweight and portable JSON API with live and historical foreign exchange (forex) rates, via a simple and easy-to-integrate API, in JSON format. Data are tracked and blended algorithmically from multiple reliable sources, ensuring fair and unbiased consistency.
- Documentation is pretty good
    - https://docs.openexchangerates.org/docs
    - Our site employs API requests to three different endpoints:
        - /latest.json
        - /historical/*.json
        - /currencies.json
- You will need to set up an account and download your own API keys