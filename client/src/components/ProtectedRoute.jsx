import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/apiHooks";
const ProtectedRoute = ({ children }) => {
  const { data, isError, isLoading } = useUser({ retry: 1 });

  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError, navigate]);

  if (isLoading) return <h1>Loading...</h1>;

  if (data) return <>{children}</>;
};

export default ProtectedRoute;
