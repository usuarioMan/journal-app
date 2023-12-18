import { TurnedInNot } from "@mui/icons-material";
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

export const SidebarItem = ({
  title,
  body,
  id,
  date,
  imageUrl = [],
  onActiveNote,
}) => {
  return (
    <ListItem
      disablePadding
      onClick={() => onActiveNote(body, date, id, title, imageUrl)}
    >
      <ListItemButton>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={title} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
