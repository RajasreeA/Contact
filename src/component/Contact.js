import React from "react";
import { TextField, Typography, Button } from "@mui/material";

function AddContact(props) {
  const {
    title,
    contact,
    nameError,
    emailError,
    phoneError,
    handleInputChange,
    handleContact,
    toggleContactForm,
  } = props;
  return (
    <>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <TextField
        label="Contact Name"
        variant="outlined"
        name="name"
        value={contact.name}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        error={nameError !== ""}
        helperText={nameError}
      />
      <TextField
        label="Email Address"
        variant="outlined"
        name="email"
        value={contact.email}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        error={emailError !== ""}
        helperText={emailError}
      />
      <TextField
        label="Phone Number"
        variant="outlined"
        name="phone"
        value={contact.phone}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        error={phoneError !== ""}
        helperText={phoneError}
      />
      <Button variant="contained" color="primary" onClick={handleContact}>
        {title}
      </Button>
      <Button
        variant="outlined"
        color="error"
        onClick={toggleContactForm}
        style={{ marginLeft: "8px" }}
      >
        Cancel
      </Button>
    </>
  );
}

export default AddContact;
