const express = require('express');
const server = express();
const nunjucks = require('nunjucks');
const {pageLanding, pageRegister, pageSearch, saveRegister, searchTeachers} = require('./pages.js');

nunjucks.configure('src/views', {
    express: server,
    noCache: true
});

server.use(express.urlencoded( { extended: true}));
server.use(express.static("assets"));

// Get requests
server.get("/", pageLanding);
server.get("/index", pageLanding);
server.get("/register", pageRegister);
server.get("/search", pageSearch);

// Post requests
server.post("/search", searchTeachers);
server.post("/register", saveRegister);

server.listen(3300);