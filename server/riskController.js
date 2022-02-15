const axios = require('axios')
const RISK_SERVICE = "https://sg7app.dassian.org:44300/sap/opu/odata/DSN/COPB_RISK_REGISTER_SRV/"
const entities = {
    contracts: "xDSNxC_risk_contract_copb"
}
const { USERNAME, PASSWORD } = process.env


module.exports = {
    getContracts: (req, res, next) => {
        axios.get(`${RISK_SERVICE}${entities.contracts}`, {
            auth: {
                username: USERNAME,
                password: PASSWORD
            }
        })
        .then(response => { res.status(200).send(response.data.d.results) })
        .catch(error => { console.log(error) })
    },
    getRisks: (req, res, next) => {

    }
}