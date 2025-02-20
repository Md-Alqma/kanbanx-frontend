import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
const LoginForm = () => {
  const { login, error, loading } = useAuthStore();
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(form.email, form.password);
    navigate("/");
  };
  return (
    <div className="flex justify-between items-center flex-col gap-4">
      <h2 className="text-2xl font-black">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form
        className="flex flex-col justify-center items-center gap-2"
        onSubmit={handleSubmit}
      >
        <div>
          <Label htmlFor="email">Email</Label>

          <Input
            type="email"
            name="email"
            placeholder="email@gmail.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>

          <Input
            type="password"
            name="password"
            placeholder="xxxxxxx"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit" disabled={loading}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
