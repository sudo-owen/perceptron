function generatePoints(n, dim, precision) {
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
    slope = (Math.random()+0.01).toFixed(2);
  }
  else {
    slope = (4*Math.random()+1).toFixed(2);
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
      .attr("r", 2.75)
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

    // New dots on click
    $("#generate1").click(function() {
    points = generatePoints($("#numPoints1").val(), 2, 3);
    generateLabels(points);
    d3.selectAll("circle").remove();
    plot(svg1);
  });

  function animate1(w, index) {
    let weights = w[index][1];
    // let idx = w[index][0];
    svg1.select(".weight1")
      .transition()
        .duration(350)
        .attr("y2", y(-weights[0]/weights[1]))
      .end()
      .then(() => {
        if (index+1 < w.length) {
          animate1(w, index+1);
        }
    });
  }

  $("#fit1").click(function() {
    while(true) {
      let [idx, newWeights] = updateWeights(weights, points);
      if (isNaN(idx)) {
        break;
      }
      weights = newWeights;
      counts[idx] += 1;
      wList.push([idx, newWeights]);
    }
    animate1(wList, 0);
  });
});
