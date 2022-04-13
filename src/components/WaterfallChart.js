import React from "react";
import axios from 'axios'
import waterfallUtility from '../utilities/waterfall'
import { FontSizes } from "@fluentui/theme";
import { PrimaryButton, DefaultButton, Text, TextField } from '@fluentui/react';


function WaterfallChart(props) {
    let { riskData, waterfallData } = props
    const { riskDescription, riskShortDescription, riskProfile, ID } = riskData

    // state
    let [scoreThresholds, setThresholds] = React.useState([])
    let [shortDesc, setShortDesc] = React.useState(riskShortDescription)
    waterfallUtility._d3Stuff.bind(this)
    waterfallUtility.renderLegend.bind(this)

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

        const parseDate = (sDate) => {
            if (sDate && typeof sDate === 'string') {
                return sDate ? new Date( parseInt( sDate.split('(')[1].split(')')[0] ) ) : ''
            } else {
                return sDate
            }
        }

        let { red, yellow, green } = thresholds
        const data = waterfallData.map(wd => {
            wd.score = wd.score ? parseFloat(wd.score) : null
            wd.oScore = wd.oScore ? parseFloat(wd.oScore) : null
            wd.cScore = wd.cScore ? parseFloat(wd.cScore) : null
            wd.oScoreDate = wd.oScoreDate ? parseDate(wd.oScoreDate) : null
            wd.cScoreDate = wd.cScoreDate ? parseDate(wd.cScoreDate) : null

            return wd
        })

        waterfallUtility._d3Stuff(chartContainer, 600, data, red, yellow, green)

    }, [scoreThresholds, waterfallData])

    const saveRisk = (e) => {
        console.log('saving')
        axios.put(`/api/risk/${ID.split('-')[1]}`, {
            data: {
                riskShortDescription: shortDesc
            }
        })
        .then(response => { console.log(response)})
        .catch(error => {
            console.log(error)
        })

    }
    const cancelChanges = (e) => {
        setShortDesc(riskShortDescription)
    }
    
    return (
        <div className="WaterfallChart" >
            <Text variant="xxLarge" > {riskDescription} </Text>
            <TextField label="Short Description"
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
            />
            <div>
                <DefaultButton text="Cancel" onClick={cancelChanges}/>
                <PrimaryButton text="Save Changes" onClick={saveRisk} />
            </div>
            <svg className="chart-container"></svg>
        </div>
    )
}

export default WaterfallChart

/* RISK FIELDS

Start_workflow_ac
ID
riskProfile
riskShortDescription
riskDescription
dateClosed
owner
ownerFullname
riskType
riskTypeText
status
statusText
pillarObject
assignedElement
assignedLineItem
assignedLineItemDescr
associatedProject
associatedProjectName
performanceObligation
performanceObligationName
performanceObligationProject
performanceObligationDescr
riskValue
originalWeightedValue
weightedValue
goalWeightedValue
currency
originalScore
originalScoreStatus
currentScore
currentScoreStatus
goalScore
goalScoreStatus
cause
event
effect
mitigationMeasures
currentProbability
currentCost
currentSchedule
currentTechnical
currentImpact
currentImpactValue
currentProbabilityValue
goalProbability
goalCost
goalSchedule
goalTechnical
dateRaised
createdby
lastReviewedDate
changedby
objectType
pillarDescription
riskManager
requiresApproval
managerFullName

*/