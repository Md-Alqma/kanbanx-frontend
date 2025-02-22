import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authApi from "@/api/authApi";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(form.email, form.password);

      const res = await authApi.login({
        email: form.email,
        password: form.password,
      });
      setLoading(false);
      localStorage.setItem("token", res.token);
      navigate("/");
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-between items-center flex-col gap-4">
      <h2 className="text-2xl font-black">Login</h2>
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

export default Login;
