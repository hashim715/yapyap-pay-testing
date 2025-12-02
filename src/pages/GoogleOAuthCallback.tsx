import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const GoogleOAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const baseURL = useSelector((state: RootState) => state.baseUrl.url);
  const navigate = useNavigate();

  const getToken = async (oauthCode: string) => {
    try {
      const response = await axios.post(
        `${baseURL}/v1/auth/google/callback/`,
        {
          code: oauthCode,
        },
        { withCredentials: true }
      );

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

  return <h1>Processing GoogleOAuth Callback...</h1>;
};

export default GoogleOAuthCallback;
