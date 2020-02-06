import {Perceptron} from './perceptron.js';
import {VotedPerceptron} from './votedPerceptron.js';
import * as m from './matrix.js';
import * as g from './graphs.js';

let models = [];
let graphs = [];
let graphIds = ["#scatterplot0", "#scatterplot1", "#scatterplot3"];
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
      g.resetLine(graph, x, y);
      let [trueSlope, points] = m.getPoints(n);
      setSlopes(parentGraph, trueSlope);
      models[index] = new Perceptron(points);
      g.scatter(graph, points, x, y);
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
      g.resetLine(graph, x, y);
      let [trueSlope, points] = m.getPoints(n, margin);
      setSlopes(parentGraph, trueSlope);
      models[index] = new Perceptron(points);
      g.scatter(graph, points, x, y);
    }
  });

  $("#fit1").click(function() {
    fitPerceptron($(this).parents(".graph"), 1);
  });

  /*
  $("#generate3").click(function() {
    let index = 2;
    let [graph, x, y] = graphs[index];
    let n = $("#numPoints1").val();
    let iter = $("#iter3").val();
    let noise = $("#noise3").val();
    let max = parseInt($("#numPoints3").attr("max"));
    let min = parseInt($("#numPoints3").attr("min"));
    if (n <= max && n >= min) {
      g.resetLine(graph, x, y);
      let [trueSlope, points] = m.getPoints(n);
      $("#slope3").text("True slope: " + trueSlope);
      $("#slope3Pred").text("Learned slope: ");
      m.flipLabels(points, (noise/100));
      models[index] = new VotedPerceptron(points, iter);
      g.scatter(graph, points, x, y);
    }
  });

  $("#fit3").click(function() {
    let index = 2;
    let [graph, x, y] = graphs[index];
    models[index].train();
  });
  */
  
});
