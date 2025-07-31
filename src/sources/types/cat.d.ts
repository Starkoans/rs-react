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

    affection_level: number;
    adaptability: number;
    child_friendly: number;
    dog_friendly: number;
    energy_level: number;
    experimental: number;
    grooming: number;
    hairless: number;
    health_issues: number;
    hypoallergenic: number;
    indoor: number;
    intelligence: number;
    rare: number;
    social_needs: number;
    stranger_friendly: number;
    vocalisation: number;

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
