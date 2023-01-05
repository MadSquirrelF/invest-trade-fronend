import { TypeRootState } from '../store';

export const selectFilter = (state: TypeRootState) => state.filter;
export const selectSort = (state: TypeRootState) => state.filter.sort;