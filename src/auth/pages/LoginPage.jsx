import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  thunkGoogleSignIn,
  thunkSingInWithEmailPassword,
} from "../../store/auth";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Link as MLink,
  Alert,
} from "@mui/material";
import { Google } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { AuthLayout } from "../layout";
import { useForm } from "../../hooks";

const formData = {
  email: "",
  password: "",
};
export const LoginPage = () => {
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector((state) => state.auth);
  const { email, password, onInputChange } = useForm(formData);

  const isAuthenticated = useMemo(() => status === "checking", [status]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(thunkSingInWithEmailPassword({ email, password }));
  };

  const onGoogleSignIn = () => {
    dispatch(thunkGoogleSignIn());
  };

  return (
    <>
      <AuthLayout title="Login">
        <form onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Email"
                type="email"
                placeholder="correo@example.com"
                fullWidth
                name="email"
                value={email}
                onChange={onInputChange}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              {" "}
              <TextField
                label="Password"
                type="password" // Cambié type a 'password'
                placeholder="Contraseña"
                fullWidth
                name="password"
                value={password}
                onChange={onInputChange}
              />
            </Grid>
            <Grid
              container
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              flexGrow={true}
              spacing={2}
              sx={{ mt: 2 }}
            >
              <Grid item xs={12} sm={12} display={!errorMessage ? "none" : ""}>
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  fullWidth
                  type="submit"
                  disabled={isAuthenticated}
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={onGoogleSignIn}
                  disabled={isAuthenticated}
                >
                  <Google />
                  <Typography sx={{ ml: 1 }}>Login</Typography>
                </Button>
              </Grid>
            </Grid>

            <Grid container direction={"row"} justifyContent={"end"}>
              <MLink
                component={Link}
                color={"inherit"}
                to="/auth/register"
                sx={{ mt: 2 }}
              >
                Create account
              </MLink>
            </Grid>
          </Grid>
        </form>
      </AuthLayout>
    </>
  );
};
