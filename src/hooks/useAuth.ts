import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../store/reducer/auth-slice";
import { RootState, AppDispatch } from "../store/store";

const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const baseURL = useSelector((state: RootState) => state.baseUrl.url);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUser(baseURL));
    }
  }, [dispatch, baseURL, user]);

  return { user, loading };
};

export default useAuth;
