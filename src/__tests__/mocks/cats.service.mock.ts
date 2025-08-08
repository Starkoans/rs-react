import { vi } from 'vitest';
import { fakeCat, mockCats } from './cats.mock';
import type { BreedsQueryParams } from '@/api/cats.service';
import { fakeCatImg } from './cat-image.mock';

export const useGetAllCatsByBreedQueryMock = vi.fn(
  (args: BreedsQueryParams) => {
    return {
      currentData: {
        data: mockCats,
        pagination: {
          page: args.page,
          limit: args.limit,
          totalItems: 1,
          totalPages: 1,
        },
      },
      isFetching: false,
      error: undefined,
      refetch: vi.fn(),
    };
  }
);
export const useGetCatByIdQueryMock = vi.fn((id) => {
  return {
    currentData: { ...fakeCat, id },
    isFetching: false,
    error: undefined,
  };
});
export const useGetCatImgQueryMock = vi.fn((id: string) => {
  return {
    currentData: { ...fakeCatImg, id },
    isFetching: false,
    error: undefined,
  };
});

vi.mock('@api/cats.service', async () => {
  const actual = await import('@/api/cats.service');
  return {
    ...actual,
    useGetAllCatsByBreedQuery: (args: BreedsQueryParams) =>
      useGetAllCatsByBreedQueryMock(args),
    useGetCatByIdQuery: (id: string) => useGetCatByIdQueryMock(id),
    useGetCatImgQuery: (id: string) => useGetCatImgQueryMock(id),
  };
});
