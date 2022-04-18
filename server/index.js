const path = require('path')
const express = require("express")
require('dotenv').config()

const riskController = require('./riskController.js');
const { entities, nav } = require('./metadata.js');
const app = express(); // create express app

const PORT = process.env.PORT || 5000

// middleware
app.use(express.static(path.join(__dirname, "..", "build")))
app.use(express.json())

// GET
app.get('/api/contract/:id', riskController.get(entities.contracts))
app.get('/api/contracts', riskController.get(entities.contracts, true))

app.get('/api/risksoncontract/:id', riskController.get(entities.contracts, false, nav.to_risk))
app.get('/api/risk/:id', riskController.get(entities.risks, false))
app.get('/api/risks', riskController.get(entities.risks, true))

app.get('/api/waterfall/:id', riskController.get(entities.risks, false, nav.to_riskWaterfall))
app.get('/api/scorethresholds', riskController.get(entities.scoreThresholds, true))

// PATCH
// app.patch('/api/risk/:riskId', riskController.updateRisk)
app.patch('/api/risk/:id', riskController.patch(entities.risks))

// react-router
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "build", "index.html"))
})

// start express server on port 5000
app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});