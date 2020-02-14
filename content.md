# Introduction

The perceptron is a linear classifier invented in 1958 by Frank Rosenblatt. It's very well-known and often one of the first things covered in a classical machine learning course. So why create another overview of this topic?

Well, I couldn't find any projects online which brought together:

1. Visualizations of the perceptron learning in real time.
2. A proof of why the perceptron learns at all.
3. Explorations into ways to extend the default perceptron algorithm.

To be clear, these all exist in different places, but I wanted to put them together and create some slick visualizations with d3.

If you're new to all this, here's an overview of the perceptron:

In the binary classification case, the perceptron is parameterized by a weight vector $w$ and, given a data point $x_i$, outputs $\hat{y_i} = \text{sign}(w \cdot x_i)$ depending on if the class is positive ($+1$) or negative ($-1$). What makes th perceptron interesting is that *if* the data we are trying to classify are linearly separable, then the perceptron learning algorithm will always converge to a vector of weights $w$ which will correctly classify all points, putting all the +1s to one side and the -1s on the other side.

The perceptron learning algorithm can be broken down into 3 simple steps:

1. Initialize a vector of starting weights $w_1 = [0...0]$
2. Run the model on your dataset until you hit the first misclassified point, i.e. where $\hat{y_i} \not= y_i$
3. When a point $(x_i, y_i)$ is misclassified, update the weights $w_t$ with the following rule: $w_{t+1} = w_t + y_i(x_i)^T$. In other words, we add (or subtract) the misclassified point's value to (or from) our weights.
4. Go back to step 2 until all points are classified correctly.

To get a feel for the algorithm, I've set up an demo below.

Clicking `Generate Points` will pick a random hyperplane (that goes through 0, once again for simplicity) to be the ground truth. Then, points are randomly generated on both sides of the hyperplane with respective +1 or -1 labels. 

After that, you can click `Fit Perceptron` to fit the model for the data. You can see each misclassified point flash briefly, moving the perceptron's weights either up or down, respectively throughout the training procedure.

At each iteration of the algorithm, you can see the current slope of $w_t$ as well as its error on the data points.

Because all of the data generated are linearly separable, the end error should always be 0. However, note that the learned slope will still differ from the true slope! This is because the perceptron is only guaranteed to converge to a $w$ that gets 0 error on the training data, *not* the ground truth hyperplane. 

**DEMO GOES HERE**

# Convergence Proof

While the above demo gives some good visual evidence that $w$ always converges to a line which separates our points, there is also a formal proof that adds some useful insights. For the proof, we'll consider running our algorithm for $k$ iterations and then show that $k$ is upper bounded by a finite value, meaning that, in finite time, our algorithm will always return a $w$ that can perfectly classify all points.

Before we begin, let's make our assumptions clear:

1. There exists some optimal $w^*$  such that for some $\epsilon > 0$, $y_i(w^* \cdot x_i) \ge \epsilon$ for all inputs on the training set. In other words, we assume the points are linearly separable with a margin of $\epsilon$ (as long as our hyperplane is normalized). 
2. $||w^*|| = 1$. Though not strictly necessary, this gives us a unique $w^*$ and makes the proof simpler.
3. For all $x_i$ in our dataset $X$, $||x_i|| < R$. In other words, this bounds the coordinates of our points by a hypersphere with radius equal to the farthest point from the origin in our dataset.

### Inequality 1
First, let $w^{k+1}$ be the vector of weights returned by our algorithm after running it for $k+1$ iterations.

We'll start by showing that:

 $w_{k+1} \cdot (w^*)^T \ge w_k \cdot (w^*)^T + \epsilon$

By definition, if we assume that $w_{k}$ misclassified $(x_t, y_t)$, we update $w_{k+1} = w_k + y_t(x_t)^T $

Thus:

 $w_{k+1}\cdot (w^*)^T = (w_k + y_t(x_t)^T)\cdot (w^*)^T$ 

Next, multiplying out the right hand side, we get:

 $w_{k+1}\cdot (w^*)^T = w_k \cdot (w^*)^T + y_t(w^* \cdot x_t)$

By assumption 1, we get, as desired:

 $w_{k+1}\cdot (w^*)^T \ge w_k \cdot (w^*)^T + \epsilon$ 

Next, we'll prove by induction that:

 $w^{k+1} \cdot (w^*)^T \ge k\epsilon $

Base case where $k = 0$:

$w^{0+1} \cdot w^* = 0 \ge 0 * \epsilon = 0$

Inductive step where $k \to k+1$:

From what we proved above, we get:

$w^{k+1} \cdot (w^*)^T \ge w_k \cdot (w^*)^T + \epsilon$

Then, from the inductive hypothesis, we get:

$w^{k+1} \cdot (w^*)^T \ge (k-1)\epsilon + \epsilon$

Which gets us, as desired:

$w^{k+1} \cdot (w^*)^T \ge k\epsilon$

Next, we see that:

$w^{k+1} \cdot (w^*)^T = ||w^{k+1}|| * ||w^*||*cos(w^{k+1}, w^*)$

Because $cos(x) \le 1$, we see that:

$w^{k+1} \cdot (w^*)^T \le ||w^{k+1}||*||w^*||$

Then, because $||w^*|| = 1$ by assumption 2, we have that:

$||w^{k+1}|| \ge k\epsilon$

Because all values on both sides are positive, we also get:

$||w^{k+1}||^2 \ge k^2\epsilon^2$

### Inequality 2

First, we notice that:

$||w_{k+1}||^2 = ||w_{k} + y_t (x_t)^T||^2$

Multiplying this out, we get:

$||w_{k+1}||^2 = ||w_k||^2 + 2y_t (w_k \cdot x_t) + ||x_k||^2$

Then, because we updated on point $(x_t, y_t)$, we know that it was classified incorrectly. If a point was misclassified,  $\hat{y_t} = -y_t$, which means $2y_t(w_k \cdot x_t) < 0$ because $\text{sign}(w_k \cdot x_t) = \hat{y_t}$.

Thus:

$||w_{k+1}||^2 \le ||w_k||^2 + ||x_k||^2$

Then, by assumption 3, we know that:

$R \ge ||x_k||$

Thus:

$||w_{k+1}||^2 \le ||w_k||^2 + R^2$

Now, we'll prove by induction that:

$||w_{k+1}||^2 \le kR^2$

Base case, where $k=0$:

$||w_{0+1}||^2  = 0 \le 0*R^2 = 0$

Inductive step, where $k \to k+1$:

From what we proved above:

$||w_{k+1}||^2 \le ||w_k||^2 + R^2 $

Then, by the inductive hypothesis:

$||w_{k+1}||^2 \le (k-1)R^2 + R^2$

Which gets us, as desired:

$||w_{k+1}||^2 \le kR^2$

### Putting It Together

From Inequalities 1 and 2, we get:

$k^2\epsilon^2 \le ||w_{k+1}||^2 \le kR^2$

Dividing out, we get:

$k \le \frac{R^2}{\epsilon^2}$

Thus, we see that our algorithm will run for no more than $\frac{R^2}{\epsilon^2}$ iterations. 

### Changing the Margin

It's interesting to note that our convergence proof does not explicity depend on the dimensionality of our data points or even the number of data points! 

Rather, the runtime depends on the size of the margin between the closest point and the separating hyperplane. In other words, the difficulty of the problem is bounded by how easily separable the two classes are. The larger the margin, the faster the perceptron should converge. 

Below, you can try adjusting the margin between the two classes to see how increasing or decreasing it changes how fast the perceptron converges.

**DEMO GOES HERE**

# Linearly Unseparable Data
The default perceptron only works if the data is linearly separable.

Of course, in the real world, data is never clean; it's noisy, and the linear separability assumption we made is basically never achieved; thus, we can make no assumptions about the minimum margin. But, as we saw above, the size of the margin that separates the two classes is what allows the perceptron to converge at all. This means the normal perceptron learning algorithm gives us no guarantees on how good it will perform on noisy data. 

However, all is not lost. There are several modifications to the perceptron algorithm which enable it to do relatively well, even when the data is not linearly separable. Below, we'll explore two of them: the Maxover Algorithm and the Voted Perceptron.

# Maxover Algorithm

If the data are not linearly separable, it would be good if we could at least converge to a locally good solution. In 1995, Andreas Wendemuth introduced three modifications to the perceptron in [Learning the Unlearnable](docs/learning_the_unlearnable.pdf), all of which allow the algorithm to converge, even when the data is not linearly separable. 

The main change is to the update rule. Instead of $w_{i+1} = w_i + y_t(x_t)^T$, the update rule becomes $w_{i+1} = w_i + C(w_i, x^*)\cdot w_i + y^*(x^*)^T$, where $(x^*, y^*)$ refers to a specific data point (to be defined later) and $C$ is a function of this point and the previous iteration's weights.

Wendemuth goes on to show that as long as $(x^*, y^*)$ and $C$ are chosen to satisfy certain inequalities, this new update rule will allow $w$ to eventually converge to a solution with desirable properties.

(See the paper for more details because I'm also a little unclear on *exactly* how the math works out, but the main intuition is that as long as $C(w_i, x^*)\cdot w_i + y^*(x^*)^T$ has both a bounded norm and a positive dot product with repect to $w_i$, then norm of $w$ will always increase with each update. Then, in the limit, as the norm of $w$ grows, further updates, due to their bounded norm, will not shift the direction of $w$ very much, which leads to convergence.)

Each one of the modifications uses a different selection criteria for selecting $(x^*, y^*)$, which leads to different desirable properties. 

One of the three algorithms in Wendemuth's paper uses the criteria where after $t$ iterations, $(x^*, y^*)_t$ is defined to be a random point which satisfies the following inequality:

$\frac{y^*(w_t \cdot x^*)}{||w_t||} < k$ 

This is the version you can play with below. 

(After implementing and testing out all three, I picked this one because it seemed the most robust, even though another of Wendemuth's algorithms could have theoretically done better. Also, confusingly, though Wikipedia refers to the algorithms in Wendemuth's paper as the Maxover algorithm(s), the term never appears in the paper itself. For curious readers who want to dive into the details, the perceptron below is "Algorithm 2: Robust perception [sic]". Code for this algorithm as well as the other two are found in the GitHub repo linked at the end in Closing Thoughts.)

Note the value of $k$ is a tweakable hyperparameter; I've merely set it to default to -0.25 below because that's what worked well for me when I was playing around. Also, note the error rate. Given a noise proportion of $p$, we'd ideally like to get an error rate as close to $p$ as possible. I've found that this perceptron well in this regard.

**DEMO GOES HERE**

# Voted Perceptron

Alternatively, if the data are not linearly separable, perhaps we could get better performance using an ensemble of linear classifiers. This is what Yoav Freund and Robert Schapire accomplish in 1999's [Large Margin Classification Using the Perceptron Algorithm](docs/voted_perceptron.pdf). 

(If you are familiar with their other work on [boosting](https://en.wikipedia.org/wiki/Boosting_%28machine_learning%29), their ensemble algorithm here is unsurprising.)

There are two main changes to the perceptron algorithm:

1. When we update our weights $w_t$, we store it in a list $W$, along with a vote value $c_t$, which represents how many data points $w_t$ classified correctly before it got something wrong (and thus had to be updated). 
2. At test time, our prediction for a data point $x_i$ is the majority vote of all the weights in our list $W$, weighted by their vote. In other words, $\hat{y_i} = \text{sign}(\sum_{w_j \in W} c_j(w \cdot x_i))$

Though it's both intuitive and easy to implement, the analyses for the Voted Perceptron do not extend past running it just once through the training set. However, we empirically see that performance continues to improve if we make multiple passes through the training set and thus extend the length of $W$. 

The authors themselves have this to say about such behavior:

>As we shall see in the experiments, the [Voted Perceptron] algorithm actually continues to improve performance after $T = 1$. We have no theoretical explanation for this improvement.

Below, you can see this for yourself by changing the number of iterations the Voted Perceptron runs for, and then seeing the resulting error rate. 

During the training animation, each hyperplane in $W$ is overlaid on the graph, with an intensity proportional to its vote. You can also hover a specific hyperplane to see the number of votes it got. Typically, the points with high vote are the ones which are close to the original line; with minimal noise, we'd expect something close to the original separating hyperplane to get most of the points correct. 

The final error rate is the majority vote of all the weights in $W$, and it also tends to be pretty close to the noise rate.

**DEMO GOES HERE**

# Closing Thoughts

This is far from a complete overview, but I think it does what I wanted it to do. There's an entire family of maximum-margin perceptrons that I skipped over, but I feel like that's not as interesting as the noise-tolerant case. Furthermore, SVMs seem like the more natural place to introduce the concept. Similarly, perceptrons can also be adapted to use kernel functions, but I once again feel like that'd be too much to cram into one post.

For now, I think this project is basically done. If I have more slack, I might work on some geometric figures which give a better intuition for the perceptron convergence proof, but the algebra by itself will have to suffice for now.

It was very difficult to find information on the Maxover algorithm in particular, as almost every source on the internet blatantly plagiarized the description from Wikipedia. Shoutout to [Constructive Learning Techniques for Designing Neural Network Systems by Colin Campbell](https://citeseerx.ist.psu.edu/viewdoc/download;jsessionid=9A04C68C8BB3A1D1A198A1C485BEE204?doi=10.1.1.31.5679&rep=rep1&type=pdf) and [Statistical Mechanics of Neural Networks by William Whyte](https://pdfs.semanticscholar.org/5bad/0509f3cae1c78514a839e8b6934cf7ebc6ee.pdf) for providing succinct summaries that helped me in decoding Wendemuth's abstruse descriptions.

On that note, I'm excited that all of the code for this project is available on [GitHub](https://github.com/owenshen24/perceptron). To my knowledge, this is the first time that anyone has made available a working implementation of the Maxover algorithm. Uh…not that I expect anyone to actually use it, seeing as no one uses perceptrons for anything except academic purposes these days. But hopefully this shows up the next time someone tries to look up information about this algorithm, and they won't need to spend several weeks trying to understand Wendemuth.

In the best case, I hope this becomes a useful pedagogical part to future introductory machine learning classes, which can give students some more visual evidence for why and how the perceptron works.

### Credits

The charts were made with d3 and some jQuery for convenience. The CSS was inspired by the colors found on on [julian.com](https://www.julian.com/), which is one of the most aesthetic sites I've seen in a while. The main font is Muli from Google Fonts.

