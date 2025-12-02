import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, authActions } from "../store/reducer/auth-slice";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../store/store";

const useAxios = (): AxiosInstance => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const baseURL = useSelector((state: RootState) => state.baseUrl.url);
  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: baseURL,
  });

  const handleSignOut = async (): Promise<void> => {
    try {
      await axios.get(`${baseURL}/v1/auth/logout`, {
        withCredentials: true,
      });
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  axiosInstance.interceptors.request.use(
    async (req: InternalAxiosRequestConfig) => {
      try {
        if (!user?.expiresAt) {
          return req;
        }

        const expiresAt = new Date(user.expiresAt);
        const currentTime = new Date();
        const isExpired = expiresAt < currentTime;

        if (!isExpired) {
          return req;
        }

        try {
          const response = await axios.post(
            `${baseURL}/v1/auth/refresh/`,
            {},
            { withCredentials: true }
          );
          const newUser = response.data.user;
          dispatch(fetchUser(baseURL));
          return req;
        } catch (error) {
          console.error("Token refresh failed:", error);
          dispatch(authActions.logout());
          await handleSignOut();
          throw error;
        }
      } catch (error) {
        console.error("Request interceptor error:", error);
        dispatch(authActions.logout());
        await handleSignOut();
        throw error;
      }
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxios;
