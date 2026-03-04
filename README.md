# Network visualizations

This repo contains scripts for creating several visualizations of the same network, generated using different visualization libraries: HoloViews, sigma.js, and d3.

It uses data from a 2025 [Bloomberg investigation](https://www.bloomberg.com/graphics/2025-youtube-podcast-men-for-trump/) that analyzed the YouTube/podcaster ecosystem around Donald Trump during the 2024 presidential election.

If you want to run this repo yourself, the easiest way is to use the linked Google Colab notebooks. To run it locally, you can use the Python scripts in the `scripts/` directory.

## Sharing the visualization and code

To share both the interactive viz and the source in one place:

1. **Push this repo to GitHub** (if you haven’t already).
2. **Turn on GitHub Pages**: repo **Settings → Pages → Source**: choose “Deploy from a branch”, pick your default branch (e.g. `main`), folder “/ (root)” (or “/docs” if you put the site in `docs/`). Save.
3. After a minute or two, the site is at `https://<your-username>.github.io/<repo-name>/`.
4. **Link people to**:
   - **Live D3 viz:** `https://<your-username>.github.io/<repo-name>/d3/`
     (The `d3/` folder has `index.html` and `dataset.json`; the page loads the data from `dataset.json` in the same folder.)
   - **Code:** the same repo — e.g. `https://github.com/<your-username>/<repo-name>`. They can open `d3/index.html` and `d3/dataset.json` to see exactly what runs.

Put the live link in the README (e.g. “**Live visualization:** [link]”) so one repo link gives both the code and a clear way to run the viz.

## Scripts

### 00__generate_graph.py
[![Colab][colab-badge]](https://colab.research.google.com/github/trislee/network-demo/blob/main/notebooks/00__generate_graph.ipynb)

Downloads the data from a Bloomberg GitHub repo, processes it into network format (using [NetworkX](https://networkx.org/en/) Python package) and writes graph as GraphML file.

### 01__generate_visualization_holoviews.py
[![Colab][colab-badge]](https://colab.research.google.com/github/trislee/network-demo/blob/main/notebooks/01__generate_visualization_holoviews.ipynb)

After laying out the network out using [Gephi](https://gephi.org/), generate an interactive visualization of the network using the [HoloViews](https://holoviews.org/user_guide/Network_Graphs.html) Python package.

### 02__generate_visualization_d3_sigma.py
[![Colab][colab-badge]](https://colab.research.google.com/github/trislee/network-demo/blob/main/notebooks/02__generate_visualization_d3_sigma.ipynb)
<a href="https://observablehq.com/d/8450f35de65ff39e"><img src="https://a11ybadges.com/badge?logo=observable" height="20" alt="Observable"></a>

After laying out the network out using [Gephi](https://gephi.org/), generate the JSON-formatted network data used in interactive visualizations of the network using the JavaScript libraries [d3](https://d3-graph-gallery.com/network.html) and [sigma.js](https://www.sigmajs.org/)




[colab-badge]: https://colab.research.google.com/assets/colab-badge.svg
