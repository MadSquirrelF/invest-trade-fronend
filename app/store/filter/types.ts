export enum SortPropertyOrderEnum {
  DESC = `desc`,
  ASC = `asc`,
}
export enum SortPropertyEnum {
  RATING = `rating`,
  TITLE = `title`,
  COUNT = `countOpened`,
}
export type Sort = {
  name: string;
  sortProperty: SortPropertyEnum;
  sortOrder: SortPropertyOrderEnum;
};

export interface FilterSliceState {
  searchValue: string;
  currentPage: number;
  orderSortValue: string;
  sort: Sort;
  categoryIds: string;
  brandIds: string;
}
