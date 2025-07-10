export interface Cat {
  id: string;
  name: string;
  description: string;
  wikipedia_url: string;
  temperament: string;
  origin: string;
  life_span: string;
  weight: {
    imperial: string;
    metric: string;
  };
  image: {
    url: string;
    width?: number;
    height?: number;
  };
}
