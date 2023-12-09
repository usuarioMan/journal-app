import {
  Grid,
  Typography,
  TextField,
  Button,
  Link as MLink,
} from "@mui/material";
import { Google } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { AuthLayout } from "../layout";
export const LoginPage = () => {
  return (
    <>
      <AuthLayout title="Login">
        <form action="">
          <Grid container spacing={2}>
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
              <Grid item xs={12} sm={6}>
                {" "}
                {/* Ajusté el tamaño en pantallas medianas */}
                <Button variant="contained" fullWidth>
                  Login
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button variant="outlined" fullWidth>
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
