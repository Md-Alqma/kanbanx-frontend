import authUtils from "@/utils/authUtils";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthLayout = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await authUtils.isAuthenticated();
      if (!isAuth) {
        setloading(false);
      } else {
        navigate("/");
      }
    };
    checkAuth();
  }, [navigate]);
  return loading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <div className="flex flex-col justify-center items-center">
        <h2>KanbanX</h2>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
