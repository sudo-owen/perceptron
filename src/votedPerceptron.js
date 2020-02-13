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
        this.weights = m.addV(this.weights, p[0].map(x => x * label));
        if (vote > 0) {
          this.weightsList.push(this.weights);
          this.votesList.push(vote);
          vote = 0;
          this.pointsList.push(p[0]);
        }
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
    // let avgWlist = []
    // let avg = [0,0];
    // for (let i = 0; i < this.weightsList.length; i++) {
    //   let w = this.weightsList[i];
    //   avg = m.addV(avg, w.map((x) => x*this.votesList[i]));
    //   avgWlist.push(avg);
    // }
    // Get averaged weights
    // for (let w of avgWlist) {
    //   this.errList.push(this.err(w));
    // }
    // Set last value to be the real ensemble prediction
    //this.errList[this.errList.length-1] = this.errFinal();
  }

  predictSimple(p, weights) {
    return(Math.sign(m.dotV(weights, p[0])));
  }

  predict(p) {
    let total = 0;
    for (let i = 0; i < this.weightsList.length; i++) {
      total += this.votesList[i]*(m.dotV(this.weightsList[i], p[0]));
    }
    return(Math.sign(total));
  }

  errFinal() {
    let numWrong = 0;
    for (let p of this.points) {
      let prediction = this.predict(p);
      if (prediction !== p[1]) {
        numWrong++;
      }
    }
    return((numWrong/this.points.length).toFixed(3));
  }

  err(weights) {
    let numWrong = 0;
    for (let p of this.points) {
      let prediction = this.predictSimple(p, weights);
      if (prediction !== p[1]) {
        numWrong++;
      }
    }
    return((numWrong/this.points.length).toFixed(3));
  }

}

export { VotedPerceptron };