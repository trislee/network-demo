# Network visualizations

This repo contains scripts for creating several visualizations of the same network, generated using different visualization libraries: HoloViews, sigma.js, and d3.

You can view all of these visualizations on this repo's GitHub Pages site.

It uses data from a 2025 [Bloomberg investigation](https://www.bloomberg.com/graphics/2025-youtube-podcast-men-for-trump/) that analyzed the YouTube/podcaster ecosystem around Donald Trump during the 2024 presidential election.

If you want to run this repo yourself, the easiest way is to use the linked Google Colab notebooks. To run it locally, you can use the Python scripts in the `scripts/` directory.

## Scripts

### 00__generate_graph.py
<a href="https://colab.research.google.com/github/trislee/network-demo/blob/main/notebooks/00__generate_graph.ipynb" target="_blank" rel="noopener noreferrer"><img src="https://colab.research.google.com/assets/colab-badge.svg" height="20" alt="Colab"></a>

Downloads the data from a Bloomberg GitHub repo, processes it into network format (using [NetworkX](https://networkx.org/en/) Python package) and writes graph as GraphML file.

### 01__generate_visualization_holoviews.py
<a href="https://colab.research.google.com/github/trislee/network-demo/blob/main/notebooks/01__generate_visualization_holoviews.ipynb" target="_blank" rel="noopener noreferrer"><img src="https://colab.research.google.com/assets/colab-badge.svg" height="20" alt="Colab"></a>

After laying out the network out using [Gephi](https://gephi.org/), generate an interactive visualization of the network using the [HoloViews](https://holoviews.org/user_guide/Network_Graphs.html) Python package.

### 02__generate_visualization_d3_sigma.py
<a href="https://colab.research.google.com/github/trislee/network-demo/blob/main/notebooks/02__generate_visualization_d3_sigma.ipynb" target="_blank" rel="noopener noreferrer"><img src="https://colab.research.google.com/assets/colab-badge.svg" height="20" alt="Colab"></a>
<a href="https://observablehq.com/d/8450f35de65ff39e" target="_blank" rel="noopener noreferrer"><img src="https://a11ybadges.com/badge?logo=observable" height="20" alt="Observable"></a>

After laying out the network out using [Gephi](https://gephi.org/), generate the JSON-formatted network data used in interactive visualizations of the network using the JavaScript libraries [d3](https://d3-graph-gallery.com/network.html) and [sigma.js](https://www.sigmajs.org/)
