import {Perceptron} from './perceptron.js';
import * as m from './matrix.js';
import * as g from './graphs.js';

let perceptron = undefined;
let g1 = g.createGraph("#scatterplot1");
let graph1 = g1[0];

// JQuery onready
$(function() {

  // Generate points for perceptron graph
  $("#generate1").click(function() {
    g.resetLine(graph1, g1[1], g1[2]);
    
    let [trueSlope, points] = m.getPoints2($("#numPoints1").val());
    $("#slope1").text("True slope: " + trueSlope);
    $("#slope1Pred").text("Learned slope: ");

    perceptron = new Perceptron(points);
    g.scatter(graph1, points, g1[1], g1[2]);
  });

  // Fit and create list of weights
  $("#fit1").click(function() {
    perceptron.train();
    g.showTraining(graph1, ".weight1", g1[2], 0, perceptron.weightsList);
  });

});