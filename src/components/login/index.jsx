import { useState } from "react";
import {
  Input,
  FormGroup,
  FormControl,
  InputLabel,
  Alert,
  Button,
  Typography,
  Box,
  Container,
  Grid,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        setErrorMsg("");
        setLoading(true);
        if (email === "" || password === "") {
          setErrorMsg("Fields cannot be empty");
          setLoading(false);
          return;
        }
        const {
          data: { user, session },
          error,
        } = await login(email, password);
        if (error) {
          setErrorMsg(error.message);
          setLoading(false);
          return;
        }
        if (user && session) navigate("/");
      } catch (error) {
        setErrorMsg("Incorrect password or email");
        setLoading(false);
      }
    };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <FormGroup id="email">
            <FormControl fullWidth>
              <InputLabel>Email address</InputLabel>
              <Input id="email" onInput={(e) => setEmail(e.target.value)} />
            </FormControl>
          </FormGroup>
          <FormGroup id="password" sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Password</InputLabel>
              <Input id="password" onInput={(e) => setPassword(e.target.value)} />
            </FormControl>
          </FormGroup>
          {errorMsg && (
            <Alert severity="warning" onClose={() => setErrorMsg("")} sx={{ mt: 2 }}>
              {errorMsg}
            </Alert>
          )}
          <Button
            disabled={loading}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to={"/register"} variant="body2">
                Don't have an account? Register
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
