import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterSliceState, Sort, SortPropertyEnum, SortPropertyOrderEnum } from "./types";

const initialState: FilterSliceState = {
  searchValue: '',
  currentPage: 1,
  categoryIds: '',
  brandIds: '',
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
    setBrandId(state, action: PayloadAction<string>) {
      state.brandIds = action.payload;
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
        state.brandIds = action.payload.brandIds;
      } else {
        state.currentPage = 1;
        state.categoryIds = '';
        state.sort = {
          name: 'выбрать',
          sortProperty: SortPropertyEnum.TITLE,
          sortOrder: SortPropertyOrderEnum.DESC,
        };
      }
    }
  }

})

export const { setSort, setCurrentPage, setFilters, setSearchValue, setCategoryId, setBrandId } =
  filterSlice.actions;

export const { reducer } = filterSlice