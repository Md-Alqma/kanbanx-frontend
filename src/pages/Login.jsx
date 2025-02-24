import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import authApi from "../api/authApi";
import { Box, Button, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ username: "", password: "" });

    const data = new FormData(e.target);
    const username = data.get("username").trim();
    const password = data.get("password").trim();

    let newErrors = {};

    if (!username) newErrors.username = "Please fill this field";
    if (!password) newErrors.password = "Please fill this field";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const res = await authApi.login({ username, password });
      setLoading(false);
      localStorage.setItem("token", res.token);
      navigate("/");
    } catch (err) {
      const apiErrors = {};
      err.data.errors.forEach((e) => {
        apiErrors[e.path] = e.msg;
      });
      setLoading(false);
    }
  };

  return (
    <>
      <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit} noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          disabled={loading}
          error={!!errors.username}
          helperText={errors.username}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          name="password"
          type="password"
          disabled={loading}
          error={!!errors.password}
          helperText={errors.password}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          variant="outlined"
          fullWidth
          color="success"
          type="submit"
          loading={loading}
        >
          Login
        </LoadingButton>
      </Box>
      <Button component={Link} to="/signup" sx={{ textTransform: "none" }}>
        Don't have an account? Signup
      </Button>
    </>
  );
};

export default Login;
