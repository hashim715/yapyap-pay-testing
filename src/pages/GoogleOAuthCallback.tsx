import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { fetchUser } from "../store/reducer/auth-slice";

const GoogleOAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const baseURL = useSelector((state: RootState) => state.baseUrl.url);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const getToken = async (oauthCode: string) => {
    try {
      const response = await axios.post(
        `${baseURL}/v1/auth/google/callback/`,
        {
          code: oauthCode,
        },
        { withCredentials: true }
      );
      dispatch(fetchUser(baseURL));
      if (response.data.verified) {
        if (response.data.details_added) {
          navigate("/");
        } else {
          navigate("/onboarding/welcome");
        }
      } else {
        navigate("/phone-number");
      }
    } catch (err) {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (code) {
      getToken(code);
    } else {
      navigate("/login");
    }
  }, [code]);

  return (
    <div className="p-6 md:p-10 lg:p-14 flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-xl font-semibold text-gray-800">Processing...</p>
        <p className="text-gray-600 mt-2"></p>
      </div>
    </div>
  );
};

export default GoogleOAuthCallback;
