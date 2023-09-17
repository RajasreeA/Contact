import React from "react";
import { Typography, Box, IconButton, TextField } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadPdf from "./DownloadPdf";

function AppBar(props) {
  const {
    title,
    searchQuery,
    handleSearchChange,
    handleDelete,
    rows,
    disabled,
    toggleAddContactForm,
  } = props;

  return (
    <>
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        {title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          bgcolor: "white",
          p: 1,
          margin: "8px",
          borderRadius: 4,
        }}
      >
        <TextField
          label="Search by Name or email"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          ml: 2,
          bgcolor: "white",
          margin: "8px",
          borderRadius: 4,
        }}
      >
        <IconButton onClick={toggleAddContactForm}>
          <AddCircleIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          bgcolor: "white",
          p: 1,
          margin: "8px",
          borderRadius: 4,
        }}
      >
        <DownloadPdf rows={rows} />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          bgcolor: "white",
          borderRadius: 4,
        }}
      >
        <IconButton
          color="error"
          aria-label="Delete"
          onClick={handleDelete}
          disabled={disabled}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </>
  );
}

export default AppBar;
