import { setUser } from "@/redux/features/userSlice";
import authUtils from "@/utils/authUtils";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../common/Sidebar";

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
        dispatch(setUser(user));
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
