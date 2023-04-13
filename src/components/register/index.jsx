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
import { supabase } from "../../supabase/supabaseClient";

const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const register = (email, password) =>
    supabase.auth.signUp({
      email,
      password
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === "" || email === "" || passwordConfirm === "") {
      setErrorMsg("Fields cannot be empty");
      return;
    }
    if (password !== passwordConfirm) {
      setErrorMsg("Passwords does not match");
      return;
    }
    try {
      setErrorMsg("");
      setLoading(true);
      const { data, error } = await register(email, password);
      if (!error && data) {
        setMsg("Registration Successful. Redirecting to login page...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      setErrorMsg("Error occurred when creating account");
    }
    setLoading(false);
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
          Register
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
          <FormGroup id="passwordConfirm" sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Confirm Password</InputLabel>
              <Input id="passwordConfirm" onInput={(e) => setPasswordConfirm(e.target.value)} />
            </FormControl>
          </FormGroup>
          {errorMsg && (
            <Alert severity="warning" onClose={() => setErrorMsg("")} sx={{ mt: 2 }}>
              {errorMsg}
            </Alert>
          )}
          {msg && (
            <Alert severity="success" onClose={() => setMsg("")} sx={{ mt: 2 }}>
              {msg}
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
            Register
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to={"/login"} variant="body2">
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default RegistrationForm;