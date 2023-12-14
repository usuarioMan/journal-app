import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField, Button, Link as MLink, Alert } from "@mui/material";
import { Link } from "react-router-dom";
import { AuthLayout } from "../layout";
import { useForm } from "../../hooks";
import { thunkCreatingUserWithEmailPassword } from "../../store/auth/thunks";

const formData = {
  displayName: "",
  email: "",
  password: "",
};

const formValidations = {
  email: [
    (value) => value.includes("@") && value.includes("."),
    "The email address must be valid",
  ],
  password: [
    (value) => value.length >= 6,
    "The password must be at least 6 characters long",
  ],
  displayName: [(value) => value.trim().length >= 1, "The name is required"],
};

export const RegisterPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector((state) => state.auth);
  const {
    displayName,
    email,
    password,
    formState,
    usernameValid,
    emailValid,
    passwordValid,
    onInputChange,
    isFormValid,
  } = useForm(formData, formValidations);

  const isCheckingAuthentication = useMemo(
    () => status === "checking",
    [status]
  );

  const onSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setFormSubmitted(true);
    dispatch(thunkCreatingUserWithEmailPassword(formState));
  };
  return (
    <>
      <AuthLayout title="Register">
        <form onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Username"
                type="text"
                placeholder="Rodrigo"
                fullWidth
                name="displayName"
                value={displayName}
                onChange={onInputChange}
                error={!!usernameValid && formSubmitted}
                helperText={usernameValid && formSubmitted}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Email"
                type="email"
                placeholder="correo@example.com"
                fullWidth
                name="email"
                value={email}
                onChange={onInputChange}
                error={!!emailValid && formSubmitted}
                helperText={emailValid && formSubmitted}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              {" "}
              {/* Ajusté xs={12} */}
              <TextField
                label="Password"
                type="password" // Cambié type a 'password'
                placeholder="Contraseña"
                fullWidth
                name="password"
                value={password}
                onChange={onInputChange}
                error={!!passwordValid && formSubmitted}
                helperText={passwordValid && formSubmitted}
              />
            </Grid>

            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={12} display={!errorMessage ? "none" : ""}>
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button
                  variant="contained"
                  fullWidth
                  type="submit"
                  disabled={isCheckingAuthentication}
                >
                  Register
                </Button>
              </Grid>
            </Grid>

            <Grid container direction={"row"} justifyContent={"end"}>
              <MLink
                component={Link}
                color={"inherit"}
                to="/auth/login"
                sx={{ mt: 2 }}
              >
                Already registered ? Sign in
              </MLink>
            </Grid>
          </Grid>
        </form>
      </AuthLayout>
    </>
  );
};
