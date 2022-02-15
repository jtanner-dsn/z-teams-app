const path = require('path')
const express = require("express");
require('dotenv').config()
const riskController = require('./riskController');
const app = express(); // create express app

const PORT = 5000

// middleware
app.use(express.static(path.join(__dirname, "..", "build")))
app.use(express.static("public"))

// endpoints
app.get("/api/contracts", riskController.getContracts);
app.get('/api/risks:projectId', riskController.getRisks);


// react-router
app.use((req, res, text) => {
    res.sendFile(path.join(__dirname, "..", "build", "index.html"))
})

// start express server on port 5000
app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});