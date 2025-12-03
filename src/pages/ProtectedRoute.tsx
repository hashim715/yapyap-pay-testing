import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useOnline from "../hooks/useOnline";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const { isOnline, hasInternet } = useOnline();

  if (!isOnline)
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">503</h1>
          <p className="mb-4 text-xl text-muted-foreground">
            Oops! No internet connection
          </p>
          <a href="/" className="text-primary underline hover:text-primary/90">
            Retry
          </a>
        </div>
      </div>
    );

  if (!hasInternet)
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">503</h1>
          <p className="mb-4 text-xl text-muted-foreground">
            Oops! No internet connection
          </p>
          <a href="/" className="text-primary underline hover:text-primary/90">
            Retry
          </a>
        </div>
      </div>
    );

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
    if (!user.verified) {
      return <Navigate to="/phone-number" replace />;
    } else if (!user.details_added) {
      return <Navigate to="/onboarding/welcome" replace />;
    } else if (!user.adminVerify) {
      return <Navigate to="/onboarding/submitted" replace />;
    } else {
      return <Outlet />;
    }
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
