const express = require("express");
const http = require("http");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const {validator, validationResult} = require("express-validator");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const mongoose = require("mongoose");
const flash = require("connect-flash");
const passport = require("passport");



const app = express();

module.exports = class Application {
    constructor(){
        this.setUpExpress();
        this.setConfig();
        this.setUpMongo()
    }
    setUpExpress() {
        const server = http.createServer(app);
        server.listen('3000', ()=>console.log('running on port: localhost:3000'))
    }
    setConfig(){
        app.use(express.static('public'));
        app.set("view engine", "ejs");
        app.set("views", path.resolve("./resource/views"));
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(cookieParser("mysecretkey"));
        app.use(flash());

        app.get("/", (req, res)=>res.send("Hello World!"))
    }
    setUpMongo(){
        app.use(session(
            {
                secret: "mysecretkey",
                resave: true,
                saveUninitialized: true,
                store: MongoStore.create({mongoUrl: "mongodb://localhost:27017/"})
            }
        ))
    }
}