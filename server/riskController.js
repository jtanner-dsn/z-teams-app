const axios = require('axios')
const RISK_SERVICE = "https://sg7app.dassian.org:44300/sap/opu/odata/DSN/COPB_RISK_REGISTER_SRV/"
const entities = {
    contracts: "xDSNxC_risk_contract_copb",
    risks: "xDSNxc_risk_object_copb",
    scoreThresholds: "xDSNxi_risk_score_thresholds"
}
const nav = {
    to_risk: "/to_risk",
    to_riskWaterfall: "/to_riskWaterfall"
}
const { USERNAME, PASSWORD } = process.env
const config = {
    auth: {
        username: USERNAME,
        password: PASSWORD
    }
}

module.exports = {
    getContracts: (req, res, next) => {
        axios.get(`${RISK_SERVICE}${entities.contracts}`, config)
            .then(response => { res.status(200).send(response.data.d.results) })
            .catch(error => { console.log(error) })
    },
    getContract: (req, res, next) => {
        let { contractId } = req.params
    },
    getRisksOnContract: (req, res, next) => {
        let { contractId } = req.params
        if (!contractId){
            console.log('ERROR: no contractId')
            res.status(404).send('ERROR: no contract id')
            return
        }
        axios.get(`${RISK_SERVICE}${entities.contracts}('${contractId}')${nav.to_risk}`, config)
            .then(response => { res.status(200).send(response.data.d.results) })
            .catch(error => { console.log(error) })
    },
    getRisk: (req, res, next) => {
        let { riskId } = req.params
        if (!riskId){
            res.status(404).send('ERROR: no risk id')
            return
        }

        // axios.get(``)
    },
    getWaterfall: (req, res, next) => {
        let { riskId } = req.params
        if (!riskId){
            res.status(404).send('ERROR: no risk id')
            return
        }
        
        axios.get(`${RISK_SERVICE}${entities.risks}('id-${riskId}')${nav.to_riskWaterfall}`, config)
            .then(response => { res.status(200).send(response.data.d.results) })
            .catch(error => { console.log(error) })
    },
    getScoreThresholds: (req, res, next) => {
        axios.get(`${RISK_SERVICE}${entities.scoreThresholds}`, config)
            .then(response => res.status(200).send(response.data.d.results))
            .catch(error => console.log(error))
    }
}