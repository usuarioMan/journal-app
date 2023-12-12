import { IconButton } from "@mui/material";
import { JournalLayout } from "../Layout/JournalLayout";
import { NothingSelectedView, NoteView } from "../views";
import { AddOutlined } from "@mui/icons-material";
export const JournalPage = () => {
  return (
    <>
      <JournalLayout>
        {/* <Typography variant="h1">Journal Page</Typography> */}
        <NothingSelectedView />
        {/* <NoteView /> */}
        <IconButton
          size="large"
          sx={{
            color: "white",
            backgroundColor: "error.main",
            "&:hover": {
              backgroundColor: "error.main",
              opacity: 0.9,
            },
            position: "fixed",
            right: 50,
            bottom: 80,
          }}
        >
          <AddOutlined
            sx={{
              fontSize: 50,
            }}
          />
        </IconButton>
      </JournalLayout>
    </>
  );
};
