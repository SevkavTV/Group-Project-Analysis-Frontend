import React from 'react'
import Plotly from 'plotly.js'
import createPlotlyComponent from 'react-plotly.js/factory'

const AnalysisPlot = (props) => {
    const Plot = createPlotlyComponent(Plotly);

    const info = props.info
    const criterion = props.criterion
    let title = ''

    if(criterion == 'scheme'){
        title = "Schemes' success"
    } else if (criterion == 'possesion'){
        title = "Possesion' success"
    } else if (criterion == 'fouls') {
        title = "Fouls' success"
    }else{
        title = "Shots' success"
    }

    let loseArr = []
    let drawArr = []
    let winArr = []
    for(let scheme in info){
        loseArr.push(info[scheme]['lose'])
        drawArr.push(info[scheme]['draw'])
        winArr.push(info[scheme]['win'])
    }

    var trace1 = {
        x: Object.keys(info),
        y: loseArr,
        name: 'lose',
        type: 'bar'
    };

    var trace2 = {
        x: Object.keys(info),
        y: drawArr,
        name: 'draw',
        type: 'bar'
    };

    var trace3 = {
        x: Object.keys(info),
        y: winArr,
        name: 'win',
        type: 'bar'
    };

    return (
        <Plot
            data={[trace1, trace2, trace3]}
            layout={{ title: title, barmode: 'stack'}}
        />
    );
    
}

export default AnalysisPlot