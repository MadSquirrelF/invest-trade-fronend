import { getAdminUrl } from "config/url.config";
import { useRouter } from "next/router";
import { SubmitHandler, UseFormSetValue } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { toastr } from "react-redux-toastr";
import { toastError } from "@/utils/toastError";
import { getKeys } from "@/utils/object/getKeys";
import { WorkService } from "@/services/work.service";
import { IWorkEditInput } from "./work-edit.interface";

export const useWorkEdit = (setValue: UseFormSetValue<IWorkEditInput>) => {
  const { push, query } = useRouter();

  const workId = String(query.id);

  const { isLoading } = useQuery([`work`, workId], () => WorkService.getById(workId), {
    onSuccess: ({ data }) => {
      getKeys(data).forEach((key) => {
        setValue(key, data[key]);
      });
    },
    onError(error) {
      toastError(error, `get work`);
    },
    enabled: !!query.id,
  });

  const { mutateAsync } = useMutation(`update work`, (data: IWorkEditInput) => WorkService.updateWork(workId, data), {
    onError(error) {
      toastError(error, `Update work`);
    },
    onSuccess() {
      toastr.success(`Редактирование портфолио`, `Обновлен успешно`);
      push(getAdminUrl(`works`));
    },
  });

  const onSubmit: SubmitHandler<IWorkEditInput> = async (data) => {
    await mutateAsync(data);
  };

  return {
    onSubmit,
    isLoading,
  };
};
