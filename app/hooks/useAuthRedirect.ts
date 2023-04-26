import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "@/hooks/useAuth";
import { hideModal } from "@/store/modal/modal.slice";

export const useAuthRedirect = () => {
  const { user } = useAuth();

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) dispatch(hideModal());
  }, [dispatch, user]);
};
