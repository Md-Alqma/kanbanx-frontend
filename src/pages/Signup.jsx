import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import authApi from "@/api/authApi";

const Signup = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({ username: "", email: "", password: "", confirmPassword: "" });

    const data = new FormData(e.target);
    const username = data.get("username").trim();
    const email = data.get("email").trim();

    const password = data.get("password").trim();
    const confirmPassword = data.get("confirmPassword").trim();

    let newErrors = {};

    if (!username) newErrors.username = "Please fill this field";
    if (!email) newErrors.email = "Please fill this field";

    if (!password) newErrors.password = "Please fill this field";
    if (!confirmPassword) newErrors.confirmPassword = "Please fill this field";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const res = await authApi.signup({
        username,
        email,
        password,
        confirmPassword,
      });
      setLoading(false);

      localStorage.setItem("token", res.token);
      navigate("/");
    } catch (err) {
      const apiErrors = {};
      err.data.errors.forEach((e) => {
        apiErrors[e.path] = e.msg;
      });

      setErrors(apiErrors);
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
          id="email"
          label="Email"
          name="email"
          disabled={loading}
          error={!!errors.email}
          helperText={errors.email}
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
        <TextField
          margin="normal"
          required
          fullWidth
          id="confirmPassword"
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          disabled={loading}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          variant="outlined"
          fullWidth
          color="success"
          type="submit"
          loading={loading}
        >
          Signup
        </LoadingButton>
      </Box>
      <Button component={Link} to="/login" sx={{ textTransform: "none" }}>
        Already have an account? Login
      </Button>
    </>
  );
};

export default Signup;
