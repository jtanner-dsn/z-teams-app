import React from 'react'
import { Component } from 'react';
import axios from 'axios';
import { ComboBox } from '@fluentui/react'
import WaterfallChart from '../components/WaterfallChart';
import '../stylesheets/RiskRegister.css'

class RiskRegister extends Component {
    constructor(){
        super()

        this.state = {
            contracts: [],
            selectedContract: '',

            risks: [],
            selectedRisk: '',
            waterfallData: {}
        }
    }

    onContractChange(option) {
        this.getRisks(option.key)
            .then(response => {
                this.setState({ risks: response.data, selectedContract: option ? option.key : '', selectedRisk: '' })
            })
            .catch(error => {
                console.log(error)
            })

    }
    onRiskChange(option) {
        this.getWaterfall(option.key)
            .then(response => {
                this.setState({ selectedRisk: option.key, waterfallData: response.data })
            })
            .catch(error => {
                console.log(error)
            })

    }

    getRisks(contractId){ return axios.get(`/api/risksoncontract/${contractId}`, {}) }
    getWaterfall(riskId){ return axios.get(`/api/waterfall/${riskId.split('-')[1]}`, {}) }

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
        let { contracts, selectedContract, risks, selectedRisk, waterfallData } = this.state
        const show_risk_combo = selectedContract !== ''
        const show_waterfall = selectedRisk !== ''

        const contractOptions = contracts.map((c, i) => {
            return { key: c.ID, text: c.Text }
        })
        const riskOptions = risks.map((r, i) => {
            return { key: r.ID, text: `${r.riskShortDescription} - ${r.ownerFullname}` }
        })

        let riskData = { ...risks.find(risk => risk.ID === selectedRisk) }

        return (
            <div className="RiskRegister">
                <ComboBox
                    selectedKey={selectedContract}
                    label="Select Contract:"
                    autoComplete='on'
                    allowFreeform='true'
                    options={contractOptions}
                    styles={ { root: { maxWidth: 300 } } }
                    onChange={(e, o) => this.onContractChange(o)}
                />

                {
                    show_risk_combo
                    ?
                    <ComboBox
                        selectedKey={selectedRisk}
                        label="Select Risk:"
                        autoComplete='on'
                        allowFreeform='true'
                        options={riskOptions}
                        styles={ { root: { maxWidth: 300 } } }
                        onChange={(e, o) => this.onRiskChange(o)}
                    />
                    :
                    ''
                }
                {
                    show_waterfall
                    ?
                    <WaterfallChart riskData={riskData} waterfallData={waterfallData} />
                    :
                    ''
                }

            </div>
        );
    }
}

export default RiskRegister;


// ControllingArea: "A000"
// ID: "40000420"
// RiskManagerName: "Erik Hayes"
// RiskProfileDescription: "DASSIAN RISK PROFILE (HIGHEST IMPACT)"
// Text: "40000420: RA CLIN 2 Test"
// TotalNetAmount: "2500000.00"
// TransactionCurrency: "USD"
// altID: "40000420"
// customerName: "Army Pentagon"
// description: "RA CLIN 2 Test"
// requiresapproval: false
// riskmanager: "EHAYES"
// riskprofile: "DSN_PROF_01"