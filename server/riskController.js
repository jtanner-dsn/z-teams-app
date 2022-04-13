// libraries
const axios = require('axios')
const { wrapper } = require('axios-cookiejar-support')
const { CookieJar } = require('tough-cookie')

// set up cookie
wrapper(axios)
// const jar = new CookieJar()

// service constants
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
const { DASSIAN_USERNAME, DASSIAN_PASSWORD } = process.env
const auth = {
    username: DASSIAN_USERNAME,
    password: DASSIAN_PASSWORD
}

const getBasicAuth = (u, p) => `Basic ${Buffer.from(`${u}:${p}`).toString('base64')}`

module.exports = {
    // GET
    getContracts: (req, res, next) => {
        axios.get(`${RISK_SERVICE}${entities.contracts}`, { auth })
            .then(response => { res.status(200).send(response.data.d.results) })
            .catch(error => { res.status(401).send(error) })
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
        axios.get(`${RISK_SERVICE}${entities.contracts}('${contractId}')${nav.to_risk}`, { auth })
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
        
        axios.get(`${RISK_SERVICE}${entities.risks}('id-${riskId}')${nav.to_riskWaterfall}`, { auth })
            .then(response => { res.status(200).send(response.data.d.results) })
            .catch(error => { console.log(error) })
    },
    getScoreThresholds: (req, res, next) => {
        axios.get(`${RISK_SERVICE}${entities.scoreThresholds}`, { auth })
            .then(response => res.status(200).send(response.data.d.results))
            .catch(error => console.log(error))
    },
    // UPDATE
    updateRisk: (req, res, next) => {
        const { riskId } = req.params
        const bodyData = { ...req.body.data }
        const url = `${RISK_SERVICE}${entities.risks}('id-${riskId}')`
        const jar = new CookieJar()

        axios.get(url, {
            jar,
            headers: {
                'Authorization': getBasicAuth(DASSIAN_USERNAME, DASSIAN_PASSWORD),
                "x-csrf-token" : "Fetch"
            }
        })
        .then(response => {
            const token = response.headers['x-csrf-token']
            console.log('- - - - - - - - - - - - - - got the token: ' + `'${token}'` + ' - - - - - - - - - - - - - -')

            axios.patch(url, {
                jar,
                headers: {
                    'Authorization': getBasicAuth(DASSIAN_USERNAME, DASSIAN_PASSWORD),
                    "X-CSRF-Token": token
                },
                data: bodyData
            })
            .then(putRes => {
                console.log('update successful!')
            })
            .catch(putError => {
                console.log("patch Error: " + putError.message)
                res.status(putError.response.status).send(putError)
            })
        })
        .catch(error => {
            res.status(error.response.status).send(error)
        })
    }
}