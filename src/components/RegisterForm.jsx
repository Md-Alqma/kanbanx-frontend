import React, { useState } from "react";
import useAuthStore from "@/store/authStore";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
const RegisterForm = () => {
  const { register, error, loading } = useAuthStore();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(form.email, form.password);
  };
  return (
    <div className="flex justify-between items-center flex-col gap-4">
      <h2 className="text-2xl font-black">Register</h2>
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
          Register
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
