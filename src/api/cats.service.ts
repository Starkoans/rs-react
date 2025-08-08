import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Cat } from '@/sources/types/cat';
import { API_BASE_URL, API_ENDPOINTS, API_KEY } from '@/sources/constants';
import { paginateCatBreedsResponse } from './helpers/paginate-cat-breeds-response';

export interface BreedsQueryParams {
  breed?: string;
  limit?: number;
  page?: number;
}

const TAGS = {
  cats: 'Cats',
};

export const catsApi = createApi({
  reducerPath: 'catsApi',

  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('x-api-key', API_KEY);
      return headers;
    },
  }),
  tagTypes: [TAGS.cats],

  endpoints: (build) => ({
    getAllCatsByBreed: build.query<Cat.BreedsResponse, BreedsQueryParams>({
      query: ({ breed }) => {
        return breed
          ? `${API_BASE_URL}${API_ENDPOINTS.breeds}${API_ENDPOINTS.search}/?q=${breed}`
          : `${API_BASE_URL}${API_ENDPOINTS.breeds}`;
      },

      transformResponse: (res: Cat.Breed[], _, { page }) =>
        paginateCatBreedsResponse(res, page),

      providesTags: [TAGS.cats],
    }),

    getCatById: build.query<Cat.Breed, string>({
      query: (id: string) => `${API_BASE_URL}${API_ENDPOINTS.breeds}/${id}`,
      providesTags: (_res, _err, id) => [{ type: TAGS.cats, id }],
    }),

    getCatImg: build.query<Cat.Image, string>({
      query: (imageId: string) =>
        `${API_BASE_URL}${API_ENDPOINTS.images}/${imageId}`,
      providesTags: (_res, _err, id) => [{ type: TAGS.cats, id }],
    }),
  }),
});

export const {
  useGetAllCatsByBreedQuery,
  useGetCatByIdQuery,
  useGetCatImgQuery,
} = catsApi;
