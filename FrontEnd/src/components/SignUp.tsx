import { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type FormData = {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = (data: FormData) => {
    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true);
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      setIsSubmitting(false);
      return;
    }
    
    delete data.confirmPassword;
  
    const user = {
      ...data,
      id: Date.now(),
    };
  
    let userCount = localStorage.getItem("userCount")
      ? parseInt(localStorage.getItem("userCount")!)
      : 0;
  
    // Check if same email exists on existing users
    const existingUsers = Object.values(localStorage).filter((value) =>
      value.startsWith("{")
    );
    const existingUserEmails = existingUsers.map((userString) =>
      JSON.parse(userString).email
    );
    if (existingUserEmails.includes(data.email)) {
      toast.error("This email already exists");
      setIsSubmitting(false);
      return;
    }
  
    userCount++; // Increment for new user entry
  
    localStorage.setItem(`user${userCount}`, JSON.stringify(user));
    localStorage.setItem("userCount", userCount.toString()); 
  
    navigate("/login-user");
    setIsSubmitting(false);
  };


  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "white",
        overflowY: "auto",
      }}
    >
      <Container
        sx={{
          border: "1px solid var(--primary-color)",
          borderRadius: "10px",
          width: "50%",
        }}
      >
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography
            variant="h4"
            sx={{ color: "var(--primary-color)", mb: 2 }}
          >
            Signup
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Name"
              {...register("name", { required: "Name is required" })}
              margin="normal"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              fullWidth
              label="Username"
              {...register("username", { required: "Username is required" })}
              margin="normal"
              error={!!errors.username}
              helperText={errors.username?.message}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                  message: "Invalid email address",
                },
              })}
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              margin="normal"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
              })}
              margin="normal"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 2, backgroundColor: "var(--primary-color)" }}
              fullWidth
            >
              Sign Up
            </Button>
          </form>
          <Typography variant="body2" sx={{ mt: 2, color: "var(--primary-color)" }}>
            Already have an account?{" "}
            <Button
              onClick={() => navigate("/login-user")}
              sx={{ color: "var(--secondary-color)" }}
            >
              Login
            </Button>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Signup;
