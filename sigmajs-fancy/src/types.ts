export interface NodeData {
  key: string;
  label: string;
  URL?: string;
  cluster: string;
  x: number;
  y: number;
  size?: number;
}

export interface Cluster {
  key: string;
  color: string;
  clusterLabel: string;
}

export interface Dataset {
  nodes: NodeData[];
  edges: [string, string][];
  clusters: Cluster[];
  bbox?: { x: [number, number]; y: [number, number] };
  title?: string;
  clusterTitle?: string;
  description?: string;
}

export interface FiltersState {
  clusters: Record<string, boolean>;
}
