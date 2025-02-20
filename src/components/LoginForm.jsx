import React, { useState } from "react";
import useAuthStore from "@/store/authStore";
import { PassThrough } from "stream";

const LoginForm = () => {
  const [login, loading, error] = useAuthStore();
  const [form, setForm] = useState({ email: "", password: "" });
  return <div>LoginForm</div>;
};

export default LoginForm;
