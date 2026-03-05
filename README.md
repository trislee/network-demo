# Network visualizations

This repo contains scripts for creating several visualizations of the same network, generated using different visualization libraries: HoloViews, sigma.js, and d3.

You can view all of these visualizations on this repo's [GitHub Pages](https://trislee.github.io/network-demo/) site.

It uses data from a 2025 [Bloomberg investigation](https://www.bloomberg.com/graphics/2025-youtube-podcast-men-for-trump/) that analyzed the YouTube/podcaster ecosystem around Donald Trump during the 2024 presidential election.

If you want to run this repo yourself, the easiest way is to use the linked Google Colab notebooks. To run it locally, you can use the Python scripts in the `scripts/` directory.

## Scripts

To run this locally, install necessary Python package dependencies by running command
```pip install -r requirements.txt
```
from the `scripts/` directory.

### 00__generate_graph.py
<a href="https://colab.research.google.com/github/trislee/network-demo/blob/main/notebooks/00__generate_graph.ipynb" target="_blank" rel="noopener noreferrer"><img src="https://colab.research.google.com/assets/colab-badge.svg" height="20" alt="Colab"></a>

Downloads the data from a Bloomberg GitHub repo, processes it into network format (using [NetworkX](https://networkx.org/en/) Python package) and writes graph as GraphML file.

### 01__generate_visualization_holoviews.py
<a href="https://colab.research.google.com/github/trislee/network-demo/blob/main/notebooks/01__generate_visualization_holoviews.ipynb" target="_blank" rel="noopener noreferrer"><img src="https://colab.research.google.com/assets/colab-badge.svg" height="20" alt="Colab"></a>

After laying out the network out using [Gephi](https://gephi.org/), generate an [interactive visualization](https://trislee.github.io/network-demo/holoviews/) of the network using the [HoloViews](https://holoviews.org/user_guide/Network_Graphs.html) Python package.

### 02__generate_visualization_d3_sigma.py
<a href="https://colab.research.google.com/github/trislee/network-demo/blob/main/notebooks/02__generate_visualization_d3_sigma.ipynb" target="_blank" rel="noopener noreferrer"><img src="https://colab.research.google.com/assets/colab-badge.svg" height="20" alt="Colab"></a>
<a href="https://observablehq.com/d/8450f35de65ff39e" target="_blank" rel="noopener noreferrer"><img src="https://a11ybadges.com/badge?logo=observable" height="20" alt="Observable"></a>

After laying out the network out using [Gephi](https://gephi.org/), convert the network into a JSON file, which is used in both the [D3.js](https://trislee.github.io/network-demo/sigmajs/) and [sigma.js (fancy)](https://trislee.github.io/network-demo/sigmajs-fancy/) examples.

### 03__generate_visualization_choices.py

Don't worry about this one, it's a bit of a mess. I tried to make it fairly storage-efficient because it contains information about 8 different network layouts, for different filtering/aggregation choices.
