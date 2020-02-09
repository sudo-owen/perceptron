import {Perceptron} from './perceptron.js';
import {VotedPerceptron} from './votedPerceptron.js';
import {MaxoverPerceptron} from './maxoverPerceptron.js';
import * as m from './matrix.js';
import * as g from './graphs.js';

let models = [];
let graphs = [];
let graphIds = ["#scatterplot0", "#scatterplot1", "#scatterplot2"];
// Set up d3 references
for (let id of graphIds) {
  graphs.push(g.createGraph(id));
}

// JQuery onready
$(function() {

  function validRange(input, n) {
    let max = parseInt(input.attr("max"));
    let min = parseInt(input.attr("min"));
    return(n <= max && n >= min);
  }

  function setSlopes(parentGraph, trueSlope) {
    parentGraph.find(".trueSlope").text("True slope: " + trueSlope);
    parentGraph.find(".predSlope").text("Learned slope: ");
  }

  function fitPerceptron(parentGraph, index) {
    let [graph, x, y] = graphs[index];
    models[index].train();
    let predSlope = parentGraph.find(".predSlope");
    g.showTraining(graph, ".hyperplane", predSlope, y, 0, models[index].weightsList);
  }

  /*
   generateN will generate a scatterplot
   fitN will show the training procedure
  */

  $("#generate0").click(function() {
    let index = 0;
    let parentGraph = $(this).parents(".graph");
    let [graph, x, y] = graphs[index];
    let input = parentGraph.find(".numPoints");
    let n = input.val();
    if (validRange(input, n)) {
      let [trueSlope, points] = m.getPoints(n);
      g.resetLine(graph, x, y);
      g.scatter(graph, points, x, y);
      setSlopes(parentGraph, trueSlope);
      models[index] = new Perceptron(points);
    }
  });

  $("#fit0").click(function() {
    fitPerceptron($(this).parents(".graph"), 0);
  });

  $("#generate1").click(function() {
    let index = 1;
    let parentGraph = $(this).parents(".graph");
    let [graph, x, y] = graphs[index];
    let input = parentGraph.find(".numPoints");
    let n = input.val();
    if (validRange(input, n)) {
      let margin = (100 - parentGraph.find(".margin").val())/100;
      let [trueSlope, points] = m.getPoints(n, margin);
      g.resetLine(graph, x, y);
      g.scatter(graph, points, x, y);
      setSlopes(parentGraph, trueSlope);
      models[index] = new Perceptron(points);
    }
  });

  $("#fit1").click(function() {
    fitPerceptron($(this).parents(".graph"), 1);
  });

  
  $("#generate2").click(function() {
    let index = 2;
    let parentGraph = $(this).parents(".graph");
    let [graph, x, y] = graphs[index];
    let input = parentGraph.find(".numPoints");
    let n = input.val();
    if (validRange(input, n)) {
      let [trueSlope, points] = m.getPoints(n);
      let noise = (parentGraph.find(".noise").val()/100);
      m.flipLabels(points, noise);
      g.resetLine(graph, x, y);
      g.scatter(graph, points, x, y);
      setSlopes(parentGraph, trueSlope);
      models[index] = new MaxoverPerceptron(points);
    }
  });
  
  $("#fit2").click(function() {
    fitPerceptron($(this).parents(".graph"), 2);
  });
  
});
