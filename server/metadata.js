module.exports = {
    base_url: "https://sg7app.dassian.org:44300/sap/opu/odata/DSN/COPB_RISK_REGISTER_SRV/",
    entities: {
        contracts: "xDSNxC_risk_contract_copb",
        risks: "xDSNxc_risk_object_copb",
        scoreThresholds: "xDSNxi_risk_score_thresholds",
        metadata: "$metadata"
    },
    nav: {
        to_risk: "/to_risk",
        to_riskWaterfall: "/to_riskWaterfall"
    }
}