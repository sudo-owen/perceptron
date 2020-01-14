let precision = 3;
function generatePoints(n, dim) {
  let points = []
  for (let i = 0; i < n; i++) {
    let p = []
      for (let j = 0; j < dim; j++) {
        p.push(Math.random().toFixed(precision));
      }
    points.push(p);
    }
  return(points);
}

// Generates a random slope
// Modifies the array in place
let slope = 1;
function generateLabels(points) {
  // Slope modifier
  slope = 1;
  if (Math.random() < 0.5) {
    slope = (Math.random()+0.01).toFixed(precision);
  }
  else {
    slope = (4*Math.random()+1).toFixed(precision);
  }
  points.forEach(p => {
    if (p[1] > slope*p[0]) {
      p.push(1);
    }
    else {
      p.push(-1);
    }
  });
  $("#slope1").text("True slope: " + slope);
}

function dot(arr1, arr2) {
  let result = 0;
  for (let i = 0; i < arr1.length; i++) {
    result += arr1[i]*arr2[i];
  }
  return(result);
}

function add(arr1, arr2) {
  let result = []
  for (let i = 0; i < arr1.length; i++) {
    result.push(arr1[i]+arr2[i]);
  }
  return(result)
}

function dotW(weights, matrix) {
  return(matrix.map(function(x) {
    return(dot(weights, x));
  }));
}

function updateWeights(weights, points) {
  for (let i = 0; i < points.length; i++) {
    let p = points[i];
    let label = p[2];
    if (Math.sign(dot(weights, p.slice(0,2))) != label) {
      // update weights and return index of point
      newWeights = add(weights, p.map(x => x * label));
      return([i, newWeights]);
    }
  }
  // else, return that all are correct
  return([NaN, -1]);
}

let numPoints = 100;
// Assume 2-d weights for now
let weights = [0, 0];
let counts = Array(numPoints).fill(0);
let points = null;
let wList = [];
let circles = null;

// JQuery onready
$(function() {
  
  // Actual D3 charting code starts here:
  // set the dimensions and margins of the graph
  let margin = {top: 10, right: 30, bottom: 30, left: 60},
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  let svg1 = d3.select("#scatterplot1")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")")

  // Add X axis
  let x = d3.scaleLinear()
    .domain([0, 1])
    .range([ 0, width ]);
    svg1.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  let y = d3.scaleLinear()
    .domain([0, 1])
    .range([ height, 0]);
    svg1.append("g")
    .call(d3.axisLeft(y));

  // Add circles
  function plot(chart) {
    circles = chart.append('g')
    .selectAll("circle")
      .data(points)
    .enter().append("circle")
      .attr("cx", function (d) { return x(d[0]); } )
      .attr("cy", function (d) { return y(d[1]); } )
      .attr("r", 3.0)
      .style("fill", function(d) {
        if (d[2] == 1) {
          return("#EE5C42");
        }
        else {
          return("#0198E1");
        }
    });
  }

  svg1.append('line')
    .style("stroke", "#7e7e7e")
    .attr('x1',x(0))
    .attr('y1',y(0))
    .attr('x2',x(1))
    .attr('y2',y(0))
    .attr("class", "weight1");

  function moveLine(w, iteration) {
    let currWeights = w[iteration][1];
    let currSlope = -currWeights[0]/currWeights[1];
    let index = w[iteration][0];

    $("#slope1Pred").text("Learned slope: " + (currSlope).toFixed(precision) + " Iteration " + (iteration+1) + "/" + w.length);

    d3.select('circle:nth-child('+index+')')
      .transition()
        .attr("r", 10)
      .transition()
        .attr("r", 3)
      .end();

    svg1.select(".weight1")
      .transition()
        .duration(350)
        .attr("y2", y(currSlope))
      .end()
      .then(() => {
        if (iteration+1 < w.length) {
          moveLine(w, iteration+1);
        }
    });
  }

  // New dots on click
  $("#generate1").click(function() {
    $("#slope1Pred").text("Learned slope: ");
    points = generatePoints($("#numPoints1").val(), 2);
    generateLabels(points);
    d3.selectAll("circle").remove();
    plot(svg1);
  });

  $("#fit1").click(function() {
    weights = [0,0];
    while(true) {
      let [idx, newWeights] = updateWeights(weights, points);
      if (isNaN(idx)) {
        break;
      }
      weights = newWeights;
      counts[idx] += 1;
      wList.push([idx, newWeights]);
    }
    moveLine(wList, 0);
  });
});
