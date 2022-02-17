// import * as d3 from "https://cdn.skypack.dev/d3@5.9.7";
import * as d3 from 'd3';

export default {
    _d3Stuff: function(container, iWidth, data, red, yellow, green){
        var margin = {
            top: 40,
            right: 20,
            bottom: 100,
            left: 80
        };
        var width = iWidth - margin.left - margin.right;
        var height = 450 - margin.top - margin.bottom;
        
        // var container = "#" + this._sContainerId;
        d3.selectAll(container).select("*").remove();
        
        var svg = d3.select(container)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);
            
        var cxValue = function(d){ return d.cScoreDate; };
        var cyValue = function(d){ return d.cScore; };
        var oxValue = function(d){ return d.oScoreDate; };
        var oyValue = function(d){ return d.oScore; };
        var circleRadius = 5;
        var xAxisLabel = "Mitigation Tasks over Time";
        var yAxisLabel = "Risk Score";
        var formatTime = d3.timeFormat("%e %B %Y");
        
        // get current and original together
        var allData = [ { cScoreDate: new Date(Date.now()) } ];
        data.forEach(function(item){
            allData.push( Object.assign({}, item) );
            allData.push({
                cScoreDate: item.oScoreDate,
                cScore: item.oScore
            });
        });
        
        // scales
        var xScale = d3.scaleTime()
            .domain(d3.extent(allData, cxValue))
            .range([0, width])
            .nice();
            
        var yScale = d3.scaleLinear()
            .domain(d3.extent(allData, cyValue))
            .domain([0,1])
            .range([height, 0])
            .nice();
            
        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            

        g.append("rect") // red
            //.style("filter", "url(#drop-shadow)")
            .attr("x", 0) // start rectangle on the good position
            .attr("y", 0) // no vertical translate
            .attr("rx", 6)
            .attr("ry", 6)
            .attr("width", width) // correct size
            .attr("height", height * red)
            .attr("fill", "#ca0101"); // full height 

        g.append("rect") // yellow
            //.style("filter", "url(#drop-shadow)")
            .attr("x", 0) // start rectangle on the good position
            .attr("y", height * red) // no vertical translate
            .attr("rx", 6)
            .attr("ry", 6)
            .attr("width", width) // correct size
            .attr("height", height * (yellow + green))
            .attr("fill", "#e1d92d"); // full height 

        g.append("rect") // green
            //.style("filter", "url(#drop-shadow)")
            .attr("x", 0) // start rectangle on the good position
            .attr("y", height * (1 - green)) // no vertical translate
            .attr("rx", 6)
            .attr("ry", 6)
            .attr("width", width) // correct size
            .attr("height", height * green)
            .attr("fill", "#0b7d03"); // full height	

        var xAxis = d3.axisBottom(xScale)
            .tickPadding(15);

        var yAxis = d3.axisLeft(yScale)
            .tickPadding(10);

        var yAxisGroup = g.append("g").call(yAxis);
        
        yAxisGroup.append("text")
            .attr("class", "axis-label")
            .attr("y", -40)
            .attr("x", -height / 2)
            .attr("text-anchor", "middle")
            .text(yAxisLabel)
            .attr("fill", "black")
            .attr("transform", "rotate(-90)"); 

        var xAxisGroup = g.append("g").call(xAxis)
            .attr("transform", "translate(0," + height + ")");

        xAxisGroup.append("text")
            .attr("class", "axis-label")
            .attr("y", 50)
            .attr("x", width / 2)
            .text(xAxisLabel)
            .attr("fill", "black");
        
        // render legend
        this.renderLegend(xAxisGroup, width, margin.bottom);
        
        /////////////
        // CURRENT
        /////////////
        
        // line generator
        var cLineGenerator = d3.line()
            .x(function(d){ return xScale(cxValue(d)); })
            .y(function(d){ return yScale(cyValue(d)); })
            .curve(d3.curveStepAfter);
        
        cLineGenerator("step-after");
        
        // Define the div for the tooltip
        var div = d3.select("body").append("div")
            .attr("class", "tooltip")				
            .style("opacity", 0);
        
        // current line
        g.append("path")
            .attr("class", "line-path")
            .attr("d", cLineGenerator(data));
        
        // current circles
        for (var i = 0; i < data.length; i++){
            g.append("circle")
            .datum(data[i])
            .attr("cx", function (d) {
                return xScale(cxValue(d));
            })
            .attr("cy", function (d) {
                return yScale(cyValue(d));
            })
            .attr("stroke-width", "2px")
            .attr("r", circleRadius)
            .on("mouseover", function (d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html(formatTime(cxValue(d)) + "<br/>" + d.text)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
        }
        
        //////////////////
        // ORIGINAL
        //////////////////
        
        // line generator
        var oLineGenerator = d3.line()
            .x(function(d){ return xScale(oxValue(d)); })
            .y(function(d){ return yScale(oyValue(d)); })
            .curve(d3.curveStepAfter);
        oLineGenerator("step-atter");
            
        // original line
        g.append("path")
            .attr("class", "line-path line-original")
            .attr("d", oLineGenerator(data));
        
        // original circles
        for (var j = 0; j < data.length; j++){
            g.append("circle")
            .datum(data[j])
            .attr("cx", function (d) {
                return xScale(oxValue(d));
            })
            .attr("cy", function (d) {
                return yScale(oyValue(d));
            })
            .attr("stroke-width", "2px")
            .attr("r", circleRadius)
            .on("mouseover", function (d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html(formatTime(oxValue(d)) + "<br/>" + d.text)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
        }
        
        // today's date
        var nowX = xScale(Date.now());
        var p = "M " + nowX + " 0 L " + nowX + " " + height;
        g.append("path")
            .attr("d", p)
            .attr("class", "line-path line-today");
    },
    renderLegend: function(g, innerW, marginB){
        var p = "M 0 0 L 30 0",
            legendW = 200,
            legendH = 20;
        var data = [
          {
            label: "Current",
            pathClass: "line-path line-current"
          },
          {
            label: "Original",
            pathClass: "line-path line-original"
          },
          {
            label: "Today's Date",
            pathClass: "line-path line-today"
          }
        ];
        
        var xValue = function(d){ return d.label; };
        
        // scale
        var xScale = d3.scaleBand()
            .domain(data.map(xValue))
            .range([0, legendW]);
        var xAxis = d3.axisBottom(xScale);
        
        // legend
        var legendG = g.append("g")
            .attr("class", "legend-group")
            .attr("transform", "translate(" + (innerW / 2 - legendW / 2) + "," + (marginB / 2 + 10) + ")");
        
        // container
        legendG.append("rect")
            .attr("class", "legend-container")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", legendW)
            .attr("height", legendH);
        
        // axis
        var xAxisG = legendG.append("g").call(xAxis)
            .attr("transform", "translate(0," + legendH / 2 + ")");
        xAxisG.selectAll(".domain, .tick line").remove();
        
        // paths
        var translateFunct = function(d){ return "translate(" + ( xScale(xValue(d)) + legendW / 10 ) + "," + (legendH / 2 - 3) + ")"; };
        legendG.selectAll("path").data(data)
            .enter().append("path")
                .attr("transform", translateFunct)
                .attr("class", function(d){ return d.pathClass; })
                .attr("d", p);
    }
}