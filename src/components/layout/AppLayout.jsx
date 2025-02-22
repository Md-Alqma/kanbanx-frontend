import authUtils from "@/utils/authUtils";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const AppLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await authUtils.isAuthenticated();
      if (!user) {
        navigate("/login");
      } else {
        setLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);
  return loading ? (
    <p>Loading...</p>
  ) : (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 w-[max-content]">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
