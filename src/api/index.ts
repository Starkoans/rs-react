import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_KEY, BASE_URL, endpoints } from './api-constants';
import type { Cat } from '@/sources/types/cat';
import {
  PAGINATION_DEFAULT_LIMIT,
  PAGINATION_START_PAGE,
} from '@/sources/constants';

interface CatsBreedQueryParams {
  breed?: string;
  limit?: number;
  page?: number;
}

export const catsApi = createApi({
  reducerPath: 'catsApi',

  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('x-api-key', API_KEY);
      return headers;
    },
  }),

  endpoints: (build) => ({
    getAllCatsByBreed: build.query<Cat.BreedsResponse, CatsBreedQueryParams>({
      queryFn: async (
        {
          breed,
          limit = PAGINATION_DEFAULT_LIMIT,
          page = PAGINATION_START_PAGE,
        },
        _queryApi,
        _extraOptions,
        fetchBaseQuery
      ) => {
        const url = breed
          ? `${BASE_URL}${endpoints.breeds}${endpoints.search}/?q=${breed}`
          : `${BASE_URL}${endpoints.breeds}`;

        const response = await fetchBaseQuery(url);

        if ('error' in response && response.error)
          return { error: response.error };

        const allCats = response.data as Cat.Breed[];
        const start = (page - 1) * limit;
        const catsPage = allCats.slice(start, start + limit);

        return {
          data: {
            data: catsPage,
            pagination: {
              limit,
              page: page,
              totalItems: allCats.length,
              totalPages: Math.ceil(allCats.length / limit),
            },
          },
        };
      },
    }),

    getCatById: build.query<Cat.Breed, string>({
      query: (id: string) => `${BASE_URL}${endpoints.breeds}/${id}`,
    }),

    getCatImg: build.query({
      query: (imageId: string) => `${BASE_URL}${endpoints.images}/${imageId}`,
    }),
  }),
});

export const {
  useLazyGetAllCatsByBreedQuery,
  useGetCatByIdQuery,
  useGetCatImgQuery,
} = catsApi;
