export interface NodeData {
  key: string;
  label: string;
  tag?: string;
  URL?: string;
  cluster: string;
  x: number;
  y: number;
  size?: number;
  score?: number;
}

export interface Cluster {
  key: string;
  color: string;
  clusterLabel: string;
}

export interface Tag {
  key: string;
  image: string;
}

export interface Dataset {
  nodes: NodeData[];
  edges: [string, string][];
  clusters: Cluster[];
  tags?: Tag[];
  bbox?: { x: [number, number]; y: [number, number] };
  title?: string;
  clusterTitle?: string;
  description?: string;
}

export interface FiltersState {
  clusters: Record<string, boolean>;
  tags: Record<string, boolean>;
}
