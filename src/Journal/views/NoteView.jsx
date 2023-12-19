import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SaveOutlined, UploadOutlined } from "@mui/icons-material";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { ImageGallery } from "../components";
import { useForm } from "../../hooks/useForm";
import {
  setActiveNote,
  thunkStartSaveNote,
  thunkStartUploadingFiles,
} from "../../store";
export const NoteView = () => {
  const dispatch = useDispatch();
  const {
    active: note,
    messageSaved,
    isSaving,
  } = useSelector((state) => state.journal);
  const { body, title, date, onInputChange, formState } = useForm(note);

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  const fileInputRef = useRef();

  const onSaveNote = () => {
    dispatch(thunkStartSaveNote());
  };

  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;
    dispatch(thunkStartUploadingFiles(target.files));
  };

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire("Updated Note", messageSaved, "success");
    }
  }, [messageSaved]);

  return (
    <Grid
      container
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{
        mb: 1,
      }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight={"light"}>
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={onFileInputChange}
          style={{ display: "none" }}
        />

        <IconButton
          color="primary"
          disabled={isSaving}
          onClick={() => fileInputRef.current.click()}
        >
          <UploadOutlined />
        </IconButton>
        <Button
          disabled={isSaving}
          onClick={onSaveNote}
          color="primary"
          sx={{
            padding: 2,
          }}
        >
          <SaveOutlined
            sx={{
              fontSize: 30,
              mr: 1,
            }}
          />
          Save
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Write a title"
          label="Title"
          sx={{
            border: "none",
            mb: 1,
          }}
          name="title"
          value={title}
          onChange={onInputChange}
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="What happened today?"
          minRows={5}
          sx={{
            border: "none",
            mb: 1,
          }}
          name="body"
          value={body}
          onChange={onInputChange}
        />
      </Grid>
      <ImageGallery images={note.imageUrl} />
    </Grid>
  );
};
