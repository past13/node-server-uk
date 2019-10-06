# Short Url application

# Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

# Prerequisites

Install Node.js
Mongodb
Mongoose

# Installing
Clone the project
https://github.com/past13/url-app-test.git

App is split into 2 binaries with entry points located at:

1. First list item
    - First nested list item
    - Second nested list item
    
cmd/
├── client
│   └── app.Js
├── server
    └── app.ts
    
# Server acts as a REST api server accessible on http://localhost:3000/ by default
# Client part will be using React (serves SPA in this case) accessible on http://localhost:3001/ by default

Api endpoints

Api consists of 2 endpoints:

    (Post) /urls/ - Save input original urls
    (Get) /urls/:id - Get redirect link for url (original)
    
Scripts run server and client

Server: npm run build/dev

Client: npm run build/start

#Built With

Nodejs
React
MongoDb
