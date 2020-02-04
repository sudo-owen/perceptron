import {Perceptron} from './perceptron.js';
import * as m from './matrix.js';
import * as g from './graphs.js';

let models = [];
let graphs = [];
let graphIds = ["#scatterplot1", "#scatterplot2"];
// Set up d3 references
for (let id of graphIds) {
  graphs.push(g.createGraph(id));
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
      g.resetLine(graph, x, y);
      let [trueSlope, points] = m.getPoints(n);
      $("#slope1").text("True slope: " + trueSlope);
      $("#slope1Pred").text("Learned slope: ");
      models[index] = new Perceptron(points);;
      g.scatter(graph, points, x, y);
    }
  });

  // Fit and create list of weights
  $("#fit1").click(function() {
    let index = 0;
    let [graph, x, y] = graphs[index];
    models[index].train();
    g.showTraining(graph, ".weight1", "#slopePred1", y, 0, models[index].weightsList);
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
      g.resetLine(graph, x, y);
      let [trueSlope, points] = m.getPoints(n, margin);
      $("#slope2").text("True slope: " + trueSlope);
      $("#slopePred2").text("Learned slope: ");
      models[index] = new Perceptron(points);;
      g.scatter(graph, points, x, y);
    }
  });

  // Fit and create list of weights
  $("#fit2").click(function() {
    let index = 1;
    let [graph, x, y] = graphs[index];
    models[index].train();
    g.showTraining(graph, ".weight1", "#slopePred2", y, 0, models[index].weightsList);
  });
});
