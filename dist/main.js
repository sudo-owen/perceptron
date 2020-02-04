/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _perceptron_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _matrix_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _graphs_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);




let models = [];
let graphs = [];
let graphIds = ["#scatterplot1", "#scatterplot2"];
// Set up d3 references
for (let id of graphIds) {
  graphs.push(_graphs_js__WEBPACK_IMPORTED_MODULE_2__["createGraph"](id));
}

// JQuery onready
$(function() {

  // Generate points for perceptron graph
  $("#generate1").click(function() {
    let index = 0;
    let [graph, x, y] = graphs[index];
    let n = $("#numPoints1").val();
    let max = parseInt($("#numPoints1").attr("max"));
    let min = parseInt($("#numPoints1").attr("min"));
    if (n <= max && n >= min) {
      _graphs_js__WEBPACK_IMPORTED_MODULE_2__["resetLine"](graph, x, y);
      let [trueSlope, points] = _matrix_js__WEBPACK_IMPORTED_MODULE_1__["getPoints"](n);
      $("#slope1").text("True slope: " + trueSlope);
      $("#slope1Pred").text("Learned slope: ");
      models[index] = new _perceptron_js__WEBPACK_IMPORTED_MODULE_0__["Perceptron"](points);;
      _graphs_js__WEBPACK_IMPORTED_MODULE_2__["scatter"](graph, points, x, y);
    }
  });

  // Fit and create list of weights
  $("#fit1").click(function() {
    let index = 0;
    let [graph, x, y] = graphs[index];
    models[index].train();
    _graphs_js__WEBPACK_IMPORTED_MODULE_2__["showTraining"](graph, ".weight1", "#slopePred1", y, 0, models[index].weightsList);
  });

  // Generate points for perceptron graph with margin
  $("#generate2").click(function() {
    let index = 1;
    let [graph, x, y] = graphs[index];
    let n = $("#numPoints2").val();
    let max = parseInt($("#numPoints2").attr("max"));
    let min = parseInt($("#numPoints2").attr("min"));
    let margin = (100-$("#margin2").val())/100;
    if (n <= max && n >= min) {
      _graphs_js__WEBPACK_IMPORTED_MODULE_2__["resetLine"](graph, x, y);
      let [trueSlope, points] = _matrix_js__WEBPACK_IMPORTED_MODULE_1__["getPoints"](n, margin);
      $("#slope2").text("True slope: " + trueSlope);
      $("#slopePred2").text("Learned slope: ");
      models[index] = new _perceptron_js__WEBPACK_IMPORTED_MODULE_0__["Perceptron"](points);;
      _graphs_js__WEBPACK_IMPORTED_MODULE_2__["scatter"](graph, points, x, y);
    }
  });

  // Fit and create list of weights
  $("#fit2").click(function() {
    let index = 1;
    let [graph, x, y] = graphs[index];
    models[index].train();
    _graphs_js__WEBPACK_IMPORTED_MODULE_2__["showTraining"](graph, ".weight1", "#slopePred2", y, 0, models[index].weightsList);
  });
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Perceptron", function() { return Perceptron; });
/* harmony import */ var _matrix_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);


class Perceptron {
  
  constructor(points, maxIterations = 1000) {
    this.weights = [0,0];
    this.points = points;
    this.weightsList = [];
    this.pointsList = [];
    this.maxIterations = maxIterations;
  }

  updateWeights() {
    _matrix_js__WEBPACK_IMPORTED_MODULE_0__["shuffle"](this.points);
    for (let i = 0; i < this.points.length; i++) {
      let p = this.points[i];
      let label = p[1];
      if (Math.sign(_matrix_js__WEBPACK_IMPORTED_MODULE_0__["dotV"](this.weights, p[0])) != label) {
        this.weights = _matrix_js__WEBPACK_IMPORTED_MODULE_0__["addV"](this.weights, p[0].map(x => x * label));
        //this.pointsList.push(p[0]);
        return(true);
      }
    }
    // else, return that all are correct
    return(false);
  }

  train() {
    while(this.updateWeights()) {
      this.weightsList.push(this.weights);
      this.maxIterations -= 1;
      if (this.maxIterations == 0) {
        break;
      }
    }
  }
}




/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shuffle", function() { return shuffle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPoints", function() { return getPoints; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addV", function() { return addV; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dotV", function() { return dotV; });
function shuffle(arr) {
  for (let i = 0; i < arr.length; i++) {
    let newIndex = parseInt(Math.random()*arr.length);
    let temp = arr[i];
    arr[i] = arr[newIndex];
    arr[newIndex] = temp;
  }
}

let precision = 3;
function getPoints(n, margin = 0.95) {
  let slope;
  let points = [];
  if (Math.random() < 0.5) {
    slope = (Math.random()+0.1).toFixed(precision);
  }
  else {
    slope = (4*Math.random()+1).toFixed(precision);
  }
  // Points above the hyperplane
  for (let i = 0; i < parseInt(n/2); i++) {
    let x = Math.random().toFixed(3);
    // Ensure that the y-values don't got past [0,1]
    // we do this by ensuring we only generate x-values in
    // a valid range.
    if (slope > 1) {
      x = (Math.random()*(1/slope)).toFixed(precision);
    }
    let min = (slope*x)*(1/margin);
    let max = 1-min;
    let y = (Math.random()*max + min).toFixed(precision);
    points.push([[x, y], 1]);
  }
  // Points below the hyperplane
  for (let i = 0; i < parseInt(n/2); i++) {
    let x = Math.random().toFixed(3);
    let min = 0;
    let max = (slope*x)*margin;
    let y = (Math.random()*max + min).toFixed(precision);
    points.push([[x, y], -1]);
  }
  shuffle(points);
  return([slope, points]);
}

// Assumes two lists of same length [n x 1] + [n x 1]
function addV(v1, v2) {
  let result = [];
    for (let i = 0; i < v1.length; i++) {
      result.push(v1[i]+v2[i]);
    }
    return(result);
}

// Assumes two lists of same length [n x 1] * [n x 1]
function dotV(v1, v2) {
  let result = 0;
    for (let i = 0; i < v1.length; i++) {
      result += v1[i]*v2[i];
    }
    return(result);
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createGraph", function() { return createGraph; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetLine", function() { return resetLine; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scatter", function() { return scatter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showTraining", function() { return showTraining; });
let margin = {top: 10, right: 30, bottom: 30, left: 60},
width = 400 - margin.left - margin.right,
height = 360 - margin.top - margin.bottom;

// Append the svg object to the body of the page
function createGraph(id) {
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

function resetLine(svg, x, y) {
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
function scatter(chart, points, x, y) {
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

function showTraining(svg, lineId, slopeText, y, i, wList) {
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

/***/ })
/******/ ]);