import { useSigma } from "@react-sigma/core";
import { FC, PropsWithChildren, useEffect } from "react";

import { FiltersState } from "../types";

const GraphDataController: FC<PropsWithChildren<{ filters: FiltersState }>> = ({ filters, children }) => {
  const sigma = useSigma();
  const graph = sigma.getGraph();

  useEffect(() => {
    const { clusters, tags } = filters;
    graph.forEachNode((node, attrs) => {
      const cluster = attrs.cluster as string;
      const tag = attrs.tag as string | undefined;
      const hiddenByCluster = !clusters[cluster];
      const hiddenByTag = tag != null && Object.keys(tags).length > 0 && !tags[tag];
      graph.setNodeAttribute(node, "hidden", hiddenByCluster || hiddenByTag);
    });
  }, [graph, filters]);

  return <>{children}</>;
};

export default GraphDataController;
