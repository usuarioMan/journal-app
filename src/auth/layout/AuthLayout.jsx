import { Grid, Typography } from "@mui/material";

export const AuthLayout = ({ children, title = "" }) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        backgroundColor: "primary.main",
        minHeight: "100vh",
        p: 4,
      }}
    >
      <Grid
        item
        className="box-shadow"
        xs={12} // Cambié xs={3} a xs={12}
        md={6} // Añadí un tamaño para pantallas medianas
        sx={{
          width: { sm: 450 },
          backgroundColor: "white",
          padding: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" sx={{ mb: 1 }}>
          {title}
        </Typography>
        {children}
      </Grid>
    </Grid>
  );
};
