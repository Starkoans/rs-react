import type { Pagination } from '@/sources/types/pagination';

export namespace Cat {
  interface Breed {
    id: string;
    name: string;
    description: string;
    reference_image_id?: string;
    wikipedia_url: string;
    temperament: string;
    origin: string;
    life_span: string;
    weight: {
      imperial: string;
      metric: string;
    };
    image?: {
      url: string;
      width?: number;
      height?: number;
    };
  }

  interface Image {
    id: string;
    url: string;
    width: number;
    height: number;
  }

  interface BreedsResponse {
    data: Breed[];
    pagination: Pagination;
  }
}
