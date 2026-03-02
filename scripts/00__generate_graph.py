from itertools import combinations

import pandas as pd
import networkx as nx

# Using data from Bloomberg: https://github.com/BloombergGraphics/2025-youtube-podcast-men-for-trump
# https://www.bloomberg.com/graphics/2025-youtube-podcast-men-for-trump/
GUESTS_URL = "https://raw.githubusercontent.com/BloombergGraphics/2025-youtube-podcast-men-for-trump/refs/heads/main/data/table_guests_by_channel.csv"
VIDEOS_URL = "https://raw.githubusercontent.com/BloombergGraphics/2025-youtube-podcast-men-for-trump/refs/heads/main/data/videos_by_topic.csv"

# Ignoring guests who have appeared on 2 or fewer podcast shows (try changing this number!)
APPEARANCE_THRESHOLD = 1

OUTPUT_GRAPHML = f"bipartite_podcasts_raw_threshold={APPEARANCE_THRESHOLD}.graphml"

if __name__ == "__main__":

    #1. Fetch guest and view data and process into DataFrame format

    df = pd.read_csv(GUESTS_URL)
    df = df.fillna(0)

    vdf = pd.read_csv(VIDEOS_URL)
    channels_to_views = dict(vdf.groupby("channel_title")["video_view_count"].agg("sum"))
    podcasts = list(channels_to_views.keys())

    #2. Aggregate and filter data into list of edges

    df = df[df["no_of_channels"] > APPEARANCE_THRESHOLD]
    # Creating an edge list, where edges between 2 nodes represent one guest appearing on one podcast
    edge_list = []
    for _, row in df.iterrows():
        _tdf = row[podcasts]
        appearances = list(_tdf[_tdf == True].index)
        guest = row["guest"]
        edge_list.extend([(guest, podcast) for podcast in appearances])

    #3. Convert into graph format using NetworkX
    # Initializing a directed graph and populating it with the edge list
    G = nx.DiGraph()
    G.add_edges_from(edge_list)

    # Incorporating information about guest categories
    categories = dict(zip(df["guest"], df["category"]))
    categories.update({p : "Podcast" for p in podcasts})
    nx.set_node_attributes(G, categories, "category")

    # Incorporating information about view count
    views = dict(zip(df["guest"], df["views_sum"]))
    views.update(channels_to_views)
    nx.set_node_attributes(G, views, "views")

    # (for visualization purposes) Incorporating information about the cube root of view count
    views = {entity : int(view) for entity, view in views.items()}
    views_root_3 = {entity : view ** (1/3.) for entity, view in views.items()}
    nx.set_node_attributes(G, views_root_3, "views_root_3")

    # Write graph to file
    nx.write_graphml(G = G, path = OUTPUT_GRAPHML)