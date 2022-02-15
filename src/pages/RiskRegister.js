import React from 'react'
import { Component } from 'react';
import axios from 'axios';
import ContractList from '../components/ContractsList';
// import env from '../conf'

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
