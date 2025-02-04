import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";


type LoginForm = {
  username: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = (data: LoginForm) => {
    let foundUser = null;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("user")) {
        const storedUser = JSON.parse(localStorage.getItem(key) || "{}");
        if (storedUser.username === data.username && storedUser.password === data.password) {
          foundUser = storedUser;
          break;
        }
      }
    }
  
    if (foundUser) {
      sessionStorage.setItem("loggedUser", JSON.stringify(foundUser));
      navigate("/");
    } else {
      toast.dismiss(); // Dismiss any existing toasts before showing a new one
      toast.error("No user found", { autoClose: 3000 });
    }
  }


  return (
    <Box
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "white",
      }}
    >
      <Container sx={{
          border: "1px solid var(--primary-color)",
          borderRadius: "10px",
          width: "50%",
        }}>
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography
            variant="h4"
            sx={{ color: "var(--primary-color)", mb: 2 }}
          >
            Login
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
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
              label="Password"
              type="password"
              {...register("password", { required: "Password is required" })}
              margin="normal"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 2, backgroundColor: "var(--primary-color)" }}
              fullWidth
            >
              Login
            </Button>
          </form>
          <Typography variant="body2" sx={{ mt: 2, color: "var(--primary-color)"}}>
            Don't have an account?{" "}
            <Button
              onClick={() => navigate("/register-user")}
              sx={{ color: "var(--secondary-color)" }}
            >
              Sign Up
            </Button>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
