import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useOnline from "../hooks/useOnline";

const ProtectUserRegisterRoute = () => {
  const { user, loading } = useAuth();
  const { isOnline, hasInternet } = useOnline();

  if (!isOnline) return <p>No Network..</p>;

  if (!hasInternet) return <p>No internet access...</p>;

  if (loading) {
    return (
      <div className="p-6 md:p-10 lg:p-14 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-800">Loading...</p>
          <p className="text-gray-600 mt-2"></p>
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  } else {
    return <Outlet />;
  }
};

export default ProtectUserRegisterRoute;
