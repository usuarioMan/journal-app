import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { JournalLayout } from "../Layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views";
import { AddOutlined } from "@mui/icons-material";
import { thunkStartNewNote } from "../../store";
export const JournalPage = () => {
  const { isSaving } = useSelector((state) => state.journal);
  const { active } = useSelector((state) => state.journal);
  const isActive = !!active.id;
  const dispatch = useDispatch();
  const onClickNewNote = () => {
    dispatch(thunkStartNewNote());
  };
  return (
    <>
      <JournalLayout>
        {isActive ? <NoteView /> : <NothingSelectedView />}
        <IconButton
          onClick={isSaving ? null : onClickNewNote}
          size="large"
          sx={{
            color: "white",
            backgroundColor: isSaving ? "grey" : "error.main",
            "&:hover": {
              backgroundColor: isSaving ? "grey" : "error.main",
              opacity: 0.9,
            },
            position: "fixed",
            right: 50,
            bottom: 80,
            cursor: isSaving ? "not-allowed" : "pointer",
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
