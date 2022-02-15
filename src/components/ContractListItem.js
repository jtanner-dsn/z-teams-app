import React from "react";


export default function ContractListItem(props){

    let {
        ControllingArea,
        ID,
        RiskManagerName,
        RiskProfileDescription,
        Text,
        TotalNetAmount,
        TransactionCurrency,
        altID,
        customerName,
        description,
        requiresapproval,
        riskmanager,
        riskprofile
    } = props.data

    return (
        <tr className="ContractListItem">
            <td>{ ControllingArea }</td>
            <td>{ ID }</td>
            <td>{ RiskManagerName }</td>
            <td>{ RiskProfileDescription }</td>
            <td>{ Text }</td>
            <td>{ TotalNetAmount }</td>
            <td>{ TransactionCurrency }</td>
            <td>{ altID }</td>
            <td>{ customerName }</td>
            <td>{ description }</td>
            <td>{ requiresapproval }</td>
            <td>{ riskmanager }</td>
            <td>{ riskprofile }</td>
        </tr>
    );
}