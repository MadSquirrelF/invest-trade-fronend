export enum SortPropertyOrderEnum {
  DESC = 'desc',
  ASC = 'asc',
}
export enum SortPropertyEnum {
  RATING = 'rating',
  TITLE = 'title',
  COUNT = 'countOpened',
}
export type Sort = {
  name: string
  sortProperty: SortPropertyEnum;
  sortOrder: SortPropertyOrderEnum;
}

export interface FilterSliceState {
  searchValue: string
  currentPage: number
  sort: Sort
  categoryIds: string;
}