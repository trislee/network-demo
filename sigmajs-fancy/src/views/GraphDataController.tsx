import { useSigma } from "@react-sigma/core";
import { FC, PropsWithChildren, useEffect } from "react";

import { FiltersState } from "../types";

const GraphDataController: FC<PropsWithChildren<{ filters: FiltersState }>> = ({ filters, children }) => {
  const sigma = useSigma();
  const graph = sigma.getGraph();

  useEffect(() => {
    const { clusters } = filters;
    graph.forEachNode((node, attrs) => {
      const cluster = attrs.cluster as string;
      graph.setNodeAttribute(node, "hidden", !clusters[cluster]);
    });
  }, [graph, filters]);

  return <>{children}</>;
};

export default GraphDataController;
