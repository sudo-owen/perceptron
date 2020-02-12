import { VotedPerceptron } from "./votedPerceptron";

let margin = {top: 10, right: 30, bottom: 30, left: 60},
width = 440 - margin.left - margin.right,
height = 330 - margin.top - margin.bottom;

// Append the svg object to the body of the page
export function createGraph(id) {
  let svg = d3.select(id)
  .append("svg")
  // .attr("width", width + margin.left + margin.right)
  // .attr("height", height + margin.top + margin.bottom)
  .attr("viewBox", "0 -20 " + 440 + " " + 350 )
  .attr("preserveAspectRatio", "xMidYMid meet")
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
    .attr('x1',x(0))
    .attr('y1',y(0))
    .attr('x2',x(1))
    .attr('y2',y(0))
    .attr("class", "hyperplane");
}

export function scatter(chart, points, x, y) {
  chart.selectAll("circle").remove();
  chart.append('g')
  .selectAll("circle")
    .data(points)
  .enter().append("circle")
    .attr("cx", function (d) { return x(d[0][0]); } )
    .attr("cy", function (d) { return y(d[0][1]); } )
    .attr("r", 3.0)
    .attr("id", function (d) {
      let x = d[0][0].toString().replace('.','');
      let y = d[0][1].toString().replace('.','');
      let id = "c" + x + y;
      return(id);
    })
    .style("fill", function(d) {
      if (d[1] == 1) {
        return("#EE5C42");
      }
      else {
        return("#0198E1");
      }
  });
}

function plotLine(svg, model, xVal, slope, x, y, i) {
  let vote = model.votesList[i];
  svg.append('line')
    .style("stroke", "#7e7e7e")
    .attr('x1', 0)
    .attr('y1', height)
    .attr("x2", x(xVal))
    .attr("y2", y(slope*xVal))
    .style("stroke", function(d) {
      return(d3.interpolateLab("white", "black")(vote/model.maxVote));
    })
    .style("stroke-width", function(d) {
      return(1 + vote/model.maxVote);
    })
    .style("opacity", function(d) {
      return(0.75);
    })
    .on("mouseenter", function(d) {
      d3.select(this)
        .attr("class", "selectedLine")
      d3.select(this.parentNode)
        .append("text")
        .attr("class", "vpText")
        .attr("x", 10)
        .attr("y", -10)
        .text(function(d) {
          return("Votes: " + vote);
        })
    })
    .on("mouseout", function() {
      d3.selectAll(".vpText").remove();
      d3.select(this)
        .style("stroke", function(d) {
        return(d3.interpolateLab("#d9d9d9", "#0d0d0d")(vote/model.maxVote));
        })
        .attr("class", "");
    });
}

export function showTraining(svg, lineId, slopeText, x, y, i, model) {
  let timeUnit = 50;
  let wList = model.weightsList;
  let weights = wList[i];
  let slope = -weights[0]/weights[1];
  slopeText.text("Learned slope: " + (slope).toFixed(3) + " Iteration: " + (i+1) + "/" + wList.length);
  let pointId = ("#c" + model.pointsList[i][0].toString().replace('.','') 
    + model.pointsList[i][1].toString().replace('.',''));
  let xVal = 1;
  if (slope > 1) {
    xVal = 1/slope;
  }

  svg.select(pointId)
    .transition()
      .delay(2 * timeUnit)
      .duration(3 * timeUnit)
      .attr("r", 10.0)
      .style("fill", function(d) {
        if (d[1] == 1) {
          return("#af351f");
        }
        else {
          return("#105377");
        }
      })
      .end()
      .then(() => {
  svg.select(lineId)
    .transition()
      .duration(10 * timeUnit)
      .attr("x2", x(xVal))
      .attr("y2", y(slope*xVal))
    .end()
    .then(() => {
  svg.select(pointId)
  .transition()
    .duration(5 * timeUnit)
    .attr("r", 3.0)
    .style("fill", function(d) {
      if (d[1] == 1) {
        return("#EE5C42");
      }
      else {
        return("#0198E1");
      }
    })
    .end()
    .then(() => {
      if (model instanceof VotedPerceptron) {
        plotLine(svg, model, xVal, slope, x, y, i);
      }
      if (i+1 < wList.length) {
        showTraining(svg, lineId, slopeText, x, y, i+1, model);
      }
     })
    });
  });
}


