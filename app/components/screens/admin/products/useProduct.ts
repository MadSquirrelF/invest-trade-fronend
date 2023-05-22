import { ChangeEvent, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { getAdminUrl } from "config/url.config";
import { toastr } from "react-redux-toastr";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { toastError } from "@/utils/toastError";
import { getCategoriesList } from "@/utils/product/getCategoriesListEach";
import { ITableItem } from "@/components/ui/admin-table/AdminTable/admin-table.interface";
import { ProductService } from "@/services/product.service";
import { useDebounce } from "@/hooks/useDebounce";
import { selectFilter } from "@/store/filter/selectors";

export const useProduct = () => {
  const [searchTerm, setSearchTerm] = useState(``);
  const debouncedSearch = useDebounce(searchTerm, 500);
  const { currentPage } = useSelector(selectFilter);

  const queryData = useQuery([`product list`, debouncedSearch, currentPage], () => ProductService.getAll(debouncedSearch, String(currentPage)), {
    select: ({ data }) => data.data.map((product): ITableItem => ({
      _id: product._id,
      editUrl: getAdminUrl(`product/edit/${product._id}`),
      items: [product.title, getCategoriesList(product.category), String(product.rating), String(product.is_available)],
    })),
    onError: (error) => {
      toastError(error, `Список товара`);
    },
  });

  const { push } = useRouter();
  const { mutateAsync: createAsync } = useMutation(`create product`, () => ProductService.createProduct(), {
    onError: (error) => {
      toastError(error, `Создание товара`);
    },
    onSuccess: ({ data: _id }) => {
      toastr.success(`Создание товара`, `товар успешно создана`);
      push(getAdminUrl(`product/edit/${_id}`));
    },
  });

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const { mutateAsync: deleteAsync } = useMutation(`delete product`, (ProductId: string) => ProductService.deleteProduct(ProductId), {
    onError: (error) => {
      toastError(error, `Удаление товара`);
    },
    onSuccess: () => {
      toastr.success(`Удаление товара`, `Товара успешно удален`);
      queryData.refetch();
    },
  });
  return useMemo(() => ({
    handleSearch,
    ...queryData,
    searchTerm,
    deleteAsync,
    createAsync,
  }), [queryData, searchTerm, deleteAsync, createAsync]);
};
