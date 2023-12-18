import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/system";
import { Drawer, Toolbar, Typography, List } from "@mui/material";
import { SidebarItem } from "./SidebarItem";
import { setActiveNote } from "../../store/journal/journalSlice";
export const Sidebar = ({ drawerWidth }) => {
  const { displayName } = useSelector((state) => state.auth);
  const { notes } = useSelector((state) => state.journal);
  const dispatch = useDispatch();
  const onActiveNote = (body, date, id, title, imageUrl = []) => {
    dispatch(setActiveNote({ body, date, id, title, imageUrl }));
  };
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
              {displayName}
            </Typography>
          </Toolbar>
          <List>
            {notes.map((note) => (
              <SidebarItem
                key={note.id}
                onActiveNote={onActiveNote}
                {...note}
              />
            ))}
          </List>
        </Drawer>
      </Box>
    </>
  );
};
