# Short Url application


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.



### Prerequisites

Install Node.js
Mongodb
Mongoose



### Installing

Clone the project
https://github.com/past13/url-app-test.git
before run: npm install



### App is split into 2 binaries with entry points located at:
CLIENT
SERVER

### Server acts as a REST api server 
accessible on http://localhost:3000/ by default



### Client part will be using React (serves SPA in this case) 
accessible on http://localhost:3001/ by default

Api endpoints

    (Post) /urls/ - Save input original urls
    (Get) /urls/:id - Get redirect link for url (original)
    


### Build
Server: npm run build
Client: npm run build


    
### Deployment
Scripts run server and client

Server: npm run dev
Client: npm run start



### Built With
Nodejs
React
MongoDb

