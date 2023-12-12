import { Box } from "@mui/system";
import {
  Drawer,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Grid,
  ListItemText,
} from "@mui/material";
import { TurnedInNot } from "@mui/icons-material";
export const Sidebar = ({ drawerWidth }) => {
  return (
    <>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="permanent"
          open={true}
          sx={{
            display: { sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "boder-box",
              width: drawerWidth,
            },
          }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component={"div"}>
              Rodrigo
            </Typography>
          </Toolbar>
          <List>
            {["Enero", "Febrero", "Marzo"].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <TurnedInNot />
                  </ListItemIcon>
                  <Grid container>
                    <ListItemText primary={text} />
                    <ListItemText
                      secondary={"Veniam reprehenderit sunt duis et."}
                    />
                  </Grid>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
    </>
  );
};
