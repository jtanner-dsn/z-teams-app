import React from "react";
import * as d3 from 'd3'
import axios from 'axios'
import waterfallUtility from '../utilities/waterfall'


function WaterfallChart(props) {
    let { riskData, waterfallData } = props
    let { riskDescription, riskProfile } = riskData

    // state
    let [scoreThresholds, setThresholds] = React.useState([])

    React.useEffect(() => {
        // get score thresholds
        axios.get(`/api/scorethresholds`, {})
            .then(response => {
                setThresholds(response.data)
            })
            .catch(error => console.log(error))
    }, [waterfallData])


    React.useEffect(() => {
        // render d3
        const chartContainer = document.querySelector('.chart-container')
        const thresholds = {}
        scoreThresholds.filter(t => t.riskProfile === riskProfile).forEach(threshold => {
            let { scoreStatus, scoreValue } = threshold
            switch (scoreStatus){
                case '01':
                    thresholds.red = +scoreValue
                    break;
                case '02':
                    thresholds.yellow = +scoreValue
                    break;
                case '03':
                    thresholds.green = +scoreValue
                    break;
            }
        })

        let { red, yellow, green } = thresholds
        const data = waterfallData.map(wd => {
            wd.score = +wd.score
            return wd
        })

        console.log(thresholds)
        waterfallUtility._d3Stuff(chartContainer, 600, data, red, yellow, green)



    }, [scoreThresholds, waterfallData])
    
    return (
        <div className="WaterfallChart">
            <h2>{riskDescription}</h2>
            <div className="chart-container">

            </div>
        </div>
    )
}

export default WaterfallChart

/*

<d:Start_workflow_ac>true</d:Start_workflow_ac>
<d:ID>id-1645045284942</d:ID>
<d:riskProfile>DSN_PROF_01</d:riskProfile>
<d:riskShortDescription>Teams App test</d:riskShortDescription>
<d:riskDescription>Teams App risk waterfall test</d:riskDescription>
<d:dateClosed m:null="true"/>
<d:owner>JTANNER</d:owner>
<d:ownerFullname>Jared Tanner</d:ownerFullname>
<d:riskType>03</d:riskType>
<d:riskTypeText>Opportunity</d:riskTypeText>
<d:status>01</d:status>
<d:statusText>New</d:statusText>
<d:pillarObject>30000001</d:pillarObject>
<d:assignedElement/>
<d:assignedLineItem>000000</d:assignedLineItem>
<d:assignedLineItemDescr/>
<d:associatedProject>00000000</d:associatedProject>
<d:associatedProjectName/>
<d:performanceObligation/>
<d:performanceObligationName/>
<d:performanceObligationProject/>
<d:performanceObligationDescr/>
<d:riskValue>4.5696E7</d:riskValue>
<d:originalWeightedValue>4.34112E7</d:originalWeightedValue>
<d:weightedValue>4.34112E7</d:weightedValue>
<d:goalWeightedValue>4.5696E6</d:goalWeightedValue>
<d:currency>USD</d:currency>
<d:originalScore>9.0249999999999997E-01</d:originalScore>
<d:originalScoreStatus>Error</d:originalScoreStatus>
<d:currentScore>9.0249999999999997E-01</d:currentScore>
<d:currentScoreStatus>Error</d:currentScoreStatus>
<d:goalScore>2.9999999999999999E-02</d:goalScore>
<d:goalScoreStatus>Success</d:goalScoreStatus>
<d:cause/>
<d:event/>
<d:effect/>
<d:mitigationMeasures/>
<d:currentProbability>05</d:currentProbability>
<d:currentCost>05</d:currentCost>
<d:currentSchedule>04</d:currentSchedule>
<d:currentTechnical>05</d:currentTechnical>
<d:currentImpact>05</d:currentImpact>
<d:currentImpactValue>0.95</d:currentImpactValue>
<d:currentProbabilityValue>0.95</d:currentProbabilityValue>
<d:goalProbability>01</d:goalProbability>
<d:goalCost>02</d:goalCost>
<d:goalSchedule>01</d:goalSchedule>
<d:goalTechnical>01</d:goalTechnical>
<d:dateRaised>2022-02-16T00:00:00</d:dateRaised>
<d:createdby>JTANNER</d:createdby>
<d:lastReviewedDate m:null="true"/>
<d:changedby/>
<d:objectType>Contract</d:objectType>
<d:pillarDescription>Master Contract GPM</d:pillarDescription>
<d:riskManager>JTTEST</d:riskManager>
<d:requiresApproval>true</d:requiresApproval>
<d:managerFullName>JTTEST</d:managerFullName>

*/