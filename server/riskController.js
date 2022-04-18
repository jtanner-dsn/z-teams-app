// libraries
const axios = require('axios')
const { wrapper } = require('axios-cookiejar-support')
const { response } = require('express')
const { CookieJar } = require('tough-cookie')
const { entities, nav, base_url } = require('./metadata')
const xml2js = require('xml2js');

// set up cookie
wrapper(axios)

// service constants
const { DASSIAN_USERNAME, DASSIAN_PASSWORD } = process.env
const auth = {
    username: DASSIAN_USERNAME,
    password: DASSIAN_PASSWORD
}

// functions
const getAuth = (u, p) => `Basic ${Buffer.from(`${u}:${p}`).toString('base64')}`
const formatCookies = (cookies) => cookies.map(c => c.split(";")[0]).join('; ')

module.exports = {
    /**
     * function
     * @param {string}  entity  - the entity set name
     * @param {boolean} isSet   - is the call for a set or individual record
     * @param {string}  navProp - the navigation property
     */
    get: (entity, isSet = false, navProp = '') => {
        
        let url = (id) => base_url + entity + ( isSet ? '' : `('${id}')` ) + navProp

        return function(req, res, next) {
            let { id } = req.params
            
            axios.get( url(id), { auth })
                .then(response => {
                    res.status(200).send(response.data.d.results ? response.data.d.results : response.data.d)
                })
                .catch(error => {
                    res.status(error.response.status).send(error)
                })
        }
    },
    patch: (entity) => {
        return function(req, res, next){
            
            let { id } = req.params
            let url = base_url + entity + `('${id}')`
            console.log(url)

            axios({
                method: "head",
                auth,
                url,
                headers: { 'x-csrf-token': 'Fetch' }
            })
            .then(headResponse => {
                const token = headResponse.headers['x-csrf-token']
                const cookies = headResponse.headers['set-cookie']

                axios({
                    method: 'patch',
                    url,
                    headers: {
                        'X-CSRF-TOKEN': token,
                        'Content-Type': 'application/json',
                        'Cookie': formatCookies(cookies)
                    },
                    data: req.body.data
                })
                .then(patchResponse => { res.status(204).send(patchResponse.data) })
                .catch(patchError => { console.log(patchError.message) })
            })
            .catch(headError => { console.log(headError) })
        }
    }

}

    // updateRisk: (req, res, next) => {
    //     const { id } = req.params
    //     const bodyData = { ...req.body.data }
    //     const url = `${RISK_SERVICE}${entities.risks}('id-${riskId}')`
    //     const jar = new CookieJar()

    //     axios.head(url, {
    //         auth,
    //         headers: {
    //             "x-csrf-token" : "Fetch",
    //         }
    //     })
    //     .then(response => {
    //         const token = response.headers['x-csrf-token']
    //         console.log(response.headers)
    //         console.log('- - - - - - - - - - - - - - got the token: ' + `'${token}'` + ' - - - - - - - - - - - - - -')

    //         axios.patch(url, {
    //             auth,
    //             headers: {
    //                 "X-CSRF-Token": token,
    //             },
    //             // data: bodyData
    //         })
    //         .then(putRes => {
    //             console.log('update successful!')
    //             res.status(201).send(putRes)
    //         })
    //         .catch(putError => {
    //             console.log(putError.request.res.headers)
    //             res.status(putError.response.status).send(putError)
    //         })
    //     })
    //     .catch(error => {
    //         res.status(error.response.status).send(error)
    //     })
    // }

/*

    getContracts: (req, res, next) => {
        axios.get(`${RISK_SERVICE}${entities.contracts}`, { auth })
            .then(response => { res.status(200).send(response.data.d.results) })
            .catch(error => { res.status(401).send(error) })
    },
    getContract: (req, res, next) => {
        let { contractId } = req.params
        axios.get(`${RISK_SERVICE}${entities.contracts}('${contractId}')`, { auth })
            .then(response => { res.status(200).send(response.data.d) })
            .catch(error => { res.status(error.response.status).send(error) })
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
        const url = `${RISK_SERVICE}${entities.risks}('id-${riskId}')`

        axios.get(url, { auth })
            .then(response => { res.status(200).send(response.data.d) })
            .catch(error => { res.status(error.response.status).send(error) })
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
    }
*/