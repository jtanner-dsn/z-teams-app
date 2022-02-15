import React from 'react'
import ContractListItem from './ContractListItem'

function ContractList(props){
    
    let { contracts } = props

    const listItemElements = contracts.map((c, i) => {
        return <ContractListItem data={c} key={`contract-${i}`} />
    })

    return (
        <div className="ContractList">
            <h2>Contracts</h2>
            <table>
                <thead>
                    <tr>
                        <td> ControllingArea </td>
                        <td> ID </td>
                        <td> RiskManagerName </td>
                        <td> RiskProfileDescription </td>
                        <td> Text </td>
                        <td> TotalNetAmount </td>
                        <td> TransactionCurrency </td>
                        <td> altID </td>
                        <td> customerName </td>
                        <td> description </td>
                        <td> requiresapproval </td>
                        <td> riskmanager </td>
                        <td> riskprofile </td>
                    </tr>
                </thead>
                <tbody>
                    { listItemElements }
                </tbody>
            </table>
        </div>
    );
}

export default ContractList;
