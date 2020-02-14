import {Perceptron} from './perceptron.js';
import {VotedPerceptron} from './votedPerceptron.js';
import {MaxoverPerceptron} from './maxoverPerceptron.js';
import * as m from './matrix.js';
import * as g from './graphs.js';

let models = [];
let graphs = [];
let graphIds = ["#scatterplot0", "#scatterplot1", "#scatterplot2", "#scatterplot3"];
// Set up d3 references
for (let id of graphIds) {
  graphs.push(g.createGraph(id));
}

function validRange(input, n) {
  let max = parseInt(input.attr("max"));
  let min = parseInt(input.attr("min"));
  return(n <= max && n >= min);
}

function fitPerceptron(parentGraph, index) {
  let [graph, x, y] = graphs[index];
  models[index].train();
  let predSlope = parentGraph.find(".predSlope");
  g.showTraining(graph, ".hyperplane", predSlope, x, y, 0, models[index]);
}

function initInput() {
  $(".slider").each(function(i) {
    let initVal = $(this).val();
    $(this).siblings(".input-value").text(initVal);
  });

  // Initialize default m/s
  window.timeUnit = $(".animationSpeed").val();
}

// JQuery onready
$(function() {

  initInput();
  $(".slider").on("input", function() {
    let initVal = $(this).val();
    $(this).siblings(".input-value").text(initVal);
  });

  $(".animationSpeed").on("input", function() {
    let time = $(this).val();
    window.timeUnit = time;
  });

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
      g.resetGraphText(graph, trueSlope);
      g.scatter(graph, points, x, y);
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
      g.resetGraphText(graph, trueSlope);
      g.scatter(graph, points, x, y);
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
      g.resetGraphText(graph, trueSlope);
      g.scatter(graph, points, x, y);
      models[index] = new MaxoverPerceptron(points);
    }
  });
  
  $("#fit2").click(function() {
    fitPerceptron($(this).parents(".graph"), 2);
  });
  
  $("#generate3").click(function() {
    let index = 3;
    let parentGraph = $(this).parents(".graph");
    let [graph, x, y] = graphs[index];
    let input = parentGraph.find(".numPoints");
    let n = input.val();
    let iters = parentGraph.find(".iters").val();
    if (validRange(input, n)) {
      let [trueSlope, points] = m.getPoints(n);
      let noise = (parentGraph.find(".noise").val()/100);
      m.flipLabels(points, noise);
      g.resetLine(graph, x, y);
      g.resetGraphText(graph, trueSlope);
      g.scatter(graph, points, x, y);
      models[index] = new VotedPerceptron(points, iters);
    }
  });

  $("#fit3").click(function() {
    fitPerceptron($(this).parents(".graph"), 3);
  });
});
