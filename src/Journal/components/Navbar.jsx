import { AppBar, Toolbar, IconButton, Grid, Typography } from "@mui/material";
import { MenuOutlined, LogoutOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { thunkLogOut } from "../../store/auth";

export const Navbar = ({ drawerWidth = 240 }) => {
  const dispatch = useDispatch();

  const onLogout = () => dispatch(thunkLogOut());
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuOutlined />
        </IconButton>
        <Grid
          container
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="h6" noWrap component={"div"}>
            JournalApp
          </Typography>
          <IconButton onClick={onLogout}>
            <LogoutOutlined color="error" />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
