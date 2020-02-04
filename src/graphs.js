let margin = {top: 10, right: 30, bottom: 30, left: 60},
width = 400 - margin.left - margin.right,
height = 360 - margin.top - margin.bottom;

// Append the svg object to the body of the page
export function createGraph(id) {
  let svg = d3.select(id)
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

  // Add X axis
  let x = d3.scaleLinear()
    .domain([0, 1])
    .range([ 0, width ]);
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
  
  // Add Y axis
  let y = d3.scaleLinear()
    .domain([0, 1])
    .range([ height, 0]);
    svg.append("g")
    .call(d3.axisLeft(y));
  
  return([svg, x, y]);
}

export function resetLine(svg, x, y) {
  svg.selectAll("line").remove();
  svg.append('line')
    .style("stroke", "#7e7e7e")
    .attr('x1',x(0))
    .attr('y1',y(0))
    .attr('x2',x(1))
    .attr('y2',y(0))
    .attr("class", "weight1");
}

// Add circles
export function scatter(chart, points, x, y) {
  chart.selectAll("circle").remove();
  chart.append('g')
  .selectAll("circle")
    .data(points)
  .enter().append("circle")
    .attr("cx", function (d) { return x(d[0][0]); } )
    .attr("cy", function (d) { return y(d[0][1]); } )
    .attr("r", 3.0)
    .style("fill", function(d) {
      if (d[1] == 1) {
        return("#EE5C42");
      }
      else {
        return("#0198E1");
      }
  });
}

export function showTraining(svg, lineId, slopeText, y, i, wList) {
  let weights = wList[i];
  let slope = -weights[0]/weights[1];
  $(slopeText).text("Learned slope: " + (slope).toFixed(3) + " Iteration " + (i+1) + "/" + wList.length);
  svg.select(lineId)
      .transition()
        .duration(300)
        .attr("y2", y(slope))
      .end()
      .then(() => {
        if (i+1 < wList.length) {
          showTraining(svg, lineId, slopeText, y, i+1, wList);
        }
      })
}