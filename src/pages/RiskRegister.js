import React from 'react'
import { Component } from 'react';
import axios from 'axios';
import ContractList from '../components/ContractsList';
// import env from '../conf'

const URL = "https://sg7app.dassian.org:44300/sap/opu/odata/DSN/COPB_RISK_REGISTER_SRV/"
const entities = {
    contractList: "xDSNxC_risk_contract_copb"
}

class RiskRegister extends Component {
    constructor(){
        super()

        this.state = {
            contracts: [],
            selectedProject: '',

            risks: [],
            selectedRisk: ''
        }
    }

    componentDidMount(){
        axios.get(`/api/contracts`, {})
            .then(response => {
                this.setState({ ...this.state, contracts: response.data })
            })
            .catch(error => {
                console.log(error)
            })
    }
    
    render(){
        let { contracts } = this.state

        return (
            <div className="RiskRegister">
                <h1>Risk Register</h1>
                <ContractList contracts={contracts} />
            </div>
        );
    }
}

export default RiskRegister;
