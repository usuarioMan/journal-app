import { Grid, TextField, Button, Link as MLink } from "@mui/material";
import { Link } from "react-router-dom";
import { AuthLayout } from "../layout";
export const RegisterPage = () => {
  return (
    <>
      <AuthLayout title="Register">
        <form action="">
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Username"
                type="text"
                placeholder="Rodrigo"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Email"
                type="email"
                placeholder="correo@example.com"
                fullWidth
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
              />
            </Grid>

            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={12}>
                {" "}
                {/* Ajusté el tamaño en pantallas medianas */}
                <Button variant="contained" fullWidth>
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
