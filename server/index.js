const path = require('path')
const express = require("express")
require('dotenv').config()

const riskController = require('./riskController.js')
const app = express(); // create express app

const PORT = process.env.PORT || 5000

// middleware
app.use(express.static(path.join(__dirname, "..", "build")))
app.use(express.json())

// endpoints
app.get("/api/contracts", riskController.getContracts)
app.get("/api/contract/:contractId", riskController.getContract)

app.get('/api/risksoncontract/:contractId', riskController.getRisksOnContract)
app.get('/api/risk/:riskId', riskController.getRisk)
app.get('/api/waterfall/:riskId', riskController.getWaterfall)
app.get('/api/scorethresholds', riskController.getScoreThresholds)

app.put('/api/risk/:riskId', riskController.updateRisk)

// react-router
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "build", "index.html"))
})

// start express server on port 5000
app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});