export interface RowsData {
  country: string;
  area: string;
  proportion: string;
  shipments: string;
  weight: string;
  teu: string;
}

export interface Zoom {
  coordinates: number[];
  zoom: number;
}

export interface GeographyCountry {
  geometry: {
    coordinates: number[][];
    type: string;
  };
  id: string;
  properties: {
    name: string;
  };
  rsmKey: string;
  svgPath: string;
  type: string;
}

export interface GroupArea {
  area: string;
  totalArea: number;
  groupCountry: RowsData[];
}
