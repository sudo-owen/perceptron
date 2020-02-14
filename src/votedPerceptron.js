import * as m from './matrix.js';

class VotedPerceptron {

  constructor(points, maxIterations) {
    this.weights = [0,0];
    this.points = points;
    this.weightsList = [];
    this.votesList = [];
    this.maxVote;
    this.pointsList = [];
    this.maxIterations = maxIterations;
    this.errList = [];
  }

  updateWeights() {
    m.shuffle(this.points);
    let vote = 0;
    for (let i = 0; i < this.points.length; i++) {
      let p = this.points[i];
      let label = p[1];
      if (Math.sign(m.dotV(this.weights, p[0])) != label) {
        if (vote > 0) {
          this.weightsList.push(this.weights);
          this.votesList.push(vote);
          vote = 0;
          this.pointsList.push(p[0]);
        }
        this.weights = m.addV(this.weights, p[0].map(x => x * label));
      }
      else {
        vote += 1;
      }
    }
  }

  train() {
    for (let i = 0; i < this.maxIterations; i++) {
      this.updateWeights();
    }
    this.maxVote = Math.max(...this.votesList);
    for (let w of this.weightsList) {
      this.errList.push(this.err(w, true));
    }
    this.errList[this.errList.length-1] = this.err(this.weights, false) + "(total)";

  }

  predictSimple(p, weights) {
    return(Math.sign(m.dotV(weights, p[0])));
  }

  predict(p) {
    let total = 0;
    for (let i = 0; i < this.weightsList.length; i++) {
      total += this.votesList[i]*(this.predictSimple(p, this.weightsList[i]));
    }
    return(Math.sign(total));
  }

  err(weights, useSimple) {
    let numWrong = 0;
    for (let p of this.points) {
      let prediction = useSimple ? this.predictSimple(p, weights) : this.predict(p);
      if (prediction !== p[1]) {
        numWrong++;
      }
    }
    return((numWrong/this.points.length).toFixed(3));
  }

}

export { VotedPerceptron };