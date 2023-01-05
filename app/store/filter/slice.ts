import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterSliceState, Sort, SortPropertyEnum, SortPropertyOrderEnum } from "./types";

const initialState: FilterSliceState = {
  searchValue: '',
  currentPage: 1,
  categoryIds: '63a570091103121336665284',
  sort: {
    name: 'Название',
    sortProperty: SortPropertyEnum.TITLE,
    sortOrder: SortPropertyOrderEnum.DESC
  },
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<string>) {
      state.categoryIds = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.currentPage = action.payload.currentPage;
        state.sort = action.payload.sort;
        state.categoryIds = action.payload.categoryIds;
      } else {
        state.currentPage = 1;
        state.categoryIds = '';
        state.sort = {
          name: 'Название',
          sortProperty: SortPropertyEnum.TITLE,
          sortOrder: SortPropertyOrderEnum.DESC,
        };
      }
    }
  }

})

export const { setSort, setCurrentPage, setFilters, setSearchValue, setCategoryId } =
  filterSlice.actions;

export const { reducer } = filterSlice