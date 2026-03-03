import { FullScreenControl, SigmaContainer, ZoomControl } from "@react-sigma/core";
import Graph from "graphology";
import { constant, keyBy, mapValues, omit } from "lodash";
import { FC, useEffect, useMemo, useState } from "react";
import { BiBookContent, BiRadioCircleMarked } from "react-icons/bi";
import { BsArrowsFullscreen, BsFullscreenExit, BsZoomIn, BsZoomOut } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { Settings } from "sigma/settings";

import { drawHover, drawLabel } from "../canvas-utils";
import { Dataset, FiltersState } from "../types";
import ClustersPanel from "./ClustersPanel";
import DescriptionPanel from "./DescriptionPanel";
import GraphDataController from "./GraphDataController";
import GraphEventsController from "./GraphEventsController";
import GraphSettingsController from "./GraphSettingsController";
import GraphTitle from "./GraphTitle";
import SearchField from "./SearchField";

const MOBILE_BREAKPOINT = 1280;
const MOBILE_SCALE = 0.6;
const BASE_LABEL_THRESHOLD = 15;

const Root: FC = () => {
  const graph = useMemo(() => new Graph(), []);
  const [showContents, setShowContents] = useState(false);
  const [dataReady, setDataReady] = useState(false);
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [mobileScale, setMobileScale] = useState(1);
  const [filtersState, setFiltersState] = useState<FiltersState>({ clusters: {} });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const sigmaSettings: Partial<Settings> = useMemo(
    () => ({
      defaultDrawNodeLabel: drawLabel,
      defaultDrawNodeHover: drawHover,
      defaultEdgeType: "line",
      labelDensity: 0.07,
      labelGridCellSize: 60,
      labelRenderedSizeThreshold: BASE_LABEL_THRESHOLD * mobileScale,
      labelFont: "Lato, sans-serif",
      zIndex: true,
    }),
    [mobileScale],
  );

  // Load dataset once on mount and populate the graph (dataset never changes).
  useEffect(() => {
    const MIN_NODE_SIZE = 3;

    fetch(`./dataset.json`)
      .then((res) => res.json())
      .then((dataset: Dataset) => {
        const scale = window.innerWidth < MOBILE_BREAKPOINT ? MOBILE_SCALE : 1;
        setMobileScale(scale);

        const clusters = keyBy(dataset.clusters, "key");

        dataset.nodes.forEach((node) => {
          if (!graph.hasNode(node.key)) {
            graph.addNode(node.key, {
              ...node,
              ...omit(clusters[node.cluster], "key"),
              size: (node.size ?? MIN_NODE_SIZE) * scale,
            });
          }
        });
        dataset.edges.forEach(([source, target]) => {
          if (!graph.hasEdge(source, target)) {
            graph.addEdge(source, target, { size: 1 });
          }
        });

        setFiltersState({
          clusters: mapValues(keyBy(dataset.clusters, "key"), constant(true)),
        });
        setDataset(dataset);
        requestAnimationFrame(() => setDataReady(true));
      });
  }, [graph]);

  // Sync document title and meta description from dataset
  useEffect(() => {
    if (!dataset?.title) return;
    document.title = dataset.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", dataset.title);
  }, [dataset?.title]);

  if (!dataset) return null;

  return (
    <div id="app-root" className={showContents ? "show-contents" : ""}>
      <SigmaContainer graph={graph} settings={sigmaSettings} className="react-sigma">
        <GraphSettingsController hoveredNode={hoveredNode} />
        <GraphEventsController setHoveredNode={setHoveredNode} />
        <GraphDataController filters={filtersState} />

        {dataReady && (
          <>
            <div className="controls">
              <div className="react-sigma-control ico">
                <button
                  type="button"
                  className="show-contents"
                  onClick={() => setShowContents(true)}
                  title="Show caption and description"
                >
                  <BiBookContent />
                </button>
              </div>
              <FullScreenControl className="ico">
                <BsArrowsFullscreen />
                <BsFullscreenExit />
              </FullScreenControl>

              <ZoomControl className="ico">
                <BsZoomIn />
                <BsZoomOut />
                <BiRadioCircleMarked />
              </ZoomControl>
            </div>
            <div className="contents">
              <div className="ico">
                <button
                  type="button"
                  className="ico hide-contents"
                  onClick={() => setShowContents(false)}
                  title="Show caption and description"
                >
                  <GrClose />
                </button>
              </div>
              <GraphTitle filters={filtersState} title={dataset.title} />
              <div className="panels">
                <SearchField filters={filtersState} />
                <DescriptionPanel description={dataset.description} />
                <ClustersPanel
                  clusters={dataset.clusters}
                  clusterTitle={dataset.clusterTitle}
                  filters={filtersState}
                  setClusters={(clusters) =>
                    setFiltersState((filters) => ({
                      ...filters,
                      clusters,
                    }))
                  }
                  toggleCluster={(cluster) => {
                    setFiltersState((filters) => ({
                      ...filters,
                      clusters: filters.clusters[cluster]
                        ? omit(filters.clusters, cluster)
                        : { ...filters.clusters, [cluster]: true },
                    }));
                  }}
                />
              </div>
            </div>
          </>
        )}
      </SigmaContainer>
    </div>
  );
};

export default Root;
