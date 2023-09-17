import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import {
  createContact,
  deleteContact,
  fetchContacts,
  updateContact,
} from "../action/contacts";
import AddContact from "../component/Contact";
import AppBar from "../component/AppBar";
import DataTable from "../component/Table";
import { Typography } from "@mui/material";

function EnhancedTable() {
  const [selectedContactIds, setSelectedContactIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [rows, setRows] = useState([]);
  const [sortingOrder, setSortingOrder] = useState("asc");
  const [sortedColumn, setSortedColumn] = useState("name");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [nameEditError, setNameEditError] = useState("");
  const [emailEditError, setEmailEditError] = useState("");
  const [phoneEditError, setPhoneEditError] = useState("");
  const [isEditFormVisible, setEditFormVisibility] = useState(false);
  const [originalData, setOriginalData] = useState([]);

  const [editedContact, setEditedContact] = useState({
    id: null,
    name: "",
    email: "",
    phone: "",
  });

  const [isAddContactFormVisible, setAddContactFormVisibility] =
    useState(false);
  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleClick = (event, id) => {
    const selectedIndex = selectedContactIds.indexOf(id);
    let newSelected = [...selectedContactIds];

    if (selectedIndex === -1) {
      newSelected.push(id);
    } else {
      newSelected.splice(selectedIndex, 1);
    }

    setSelectedContactIds(newSelected);
  };

  const isSelected = (id) => selectedContactIds.includes(id);

  const handleDelete = async (e) => {
    e.preventDefault();
  
    const selectedIds = [...selectedContactIds];
  
    try {
      if (selectedIds.length === rows.length) {
        // If all rows are selected, delete all contacts.
        for (const id of selectedIds) {
          const success = await deleteContact(id);
          if (!success) {
            console.error("Error deleting contact with ID:", id);
          }
        }
        setRows([]);
      } else {
        // Delete only the selected contacts.
        const updatedRows = rows.filter((row) => !selectedIds.includes(row.id));
        setRows(updatedRows);
        for (const id of selectedIds) {
          const success = await deleteContact(id);
          if (!success) {
            console.error("Error deleting contact with ID:", id);
          }
        }
      }
  
      setSelectedContactIds([]); // Clear the selectedContactIds after deletion.
    } catch (error) {
      console.error("Error deleting contacts:", error);
    }
  };
  
  
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filteredRows = originalData.filter(
      (row) =>
        row.name.toLowerCase().includes(query.toLowerCase()) ||
        row.email.toLowerCase().includes(query.toLowerCase())
    );
    setRows(filteredRows);
  };

  const handleSortChange = (column) => {
    if (sortedColumn === column) {
      setSortingOrder(sortingOrder === "asc" ? "desc" : "asc");
    } else {
      setSortingOrder("asc");
      setSortedColumn(column);
    }
  };

  const sortRows = (a, b) => {
    const isAsc = sortingOrder === "asc";
    const column = sortedColumn;
    return isAsc
      ? a[column].localeCompare(b[column])
      : b[column].localeCompare(a[column]);
  };

  const toggleAddContactForm = () => {
    setAddContactFormVisibility(!isAddContactFormVisible);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewContact({
      ...newContact,
      [name]: value,
    });
    if (name === "name") {
      setNameError("");
    } else if (name === "email") {
      setEmailError("");
    } else if (name === "phone") {
      setPhoneError("");
    }
  };

  const handleAddContact = async (e) => {
    e.preventDefault();

    let isValid = true;

    if (newContact.name.trim() === "") {
      setNameError("Please enter a name.");
      isValid = false;
    }

    if (newContact.email.trim() === "") {
      setEmailError("Please enter an email address.");
      isValid = false;
    }

    if (newContact.phone.trim() === "") {
      setPhoneError("Please enter a phone number.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    try {
      const response = await createContact(newContact);

      if (response) {
        setRows([...rows, response]);
        setNewContact({ name: "", email: "", phone: "" });
        setAddContactFormVisibility(false);
      }
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  const toggleEditForm = () => {
    setEditFormVisibility(!isEditFormVisible);
  };

  const handleEditClick = (id) => {
    const contactToEdit = rows.find((row) => row.id === id);

    setEditedContact(contactToEdit);

    toggleEditForm();
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditedContact({
      ...editedContact,
      [name]: value,
    });
    if (name === "name") {
      setNameEditError("");
    } else if (name === "email") {
      setEmailEditError("");
    } else if (name === "phone") {
      setPhoneEditError("");
    }
  };

  const handleUpdateContact = async (e) => {
    e.preventDefault();

    let isValid = true;

    if (editedContact.name.trim() === "") {
      setNameEditError("Please enter a name.");
      isValid = false;
    }

    if (editedContact.email.trim() === "") {
      setEmailEditError("Please enter an email address.");
      isValid = false;
    }

    if (editedContact.phone.trim() === "") {
      setPhoneEditError("Please enter a phone number.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    try {
      const response = await updateContact(editedContact.id, editedContact);

      if (response) {
        const contactIndex = rows.findIndex(
          (row) => row.id === editedContact.id
        );

        if (contactIndex !== -1) {
          const updatedRows = [...rows];
          updatedRows[contactIndex] = { ...editedContact };
          setRows(updatedRows);
          toggleEditForm();
        }
      }
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const data = await fetchContacts();
      setRows(data);
      setOriginalData(data);
    }

    fetchData();
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%" }}>
        <Toolbar sx={{ backgroundColor: "navy", color: "white" }}>
          <AppBar
            title="Contacts"
            searchQuery={searchQuery}
            handleSearchChange={handleSearchChange}
            rows={rows}
            disabled={selectedContactIds.length === 0}
            handleDelete={handleDelete}
            toggleAddContactForm={toggleAddContactForm}
          />
        </Toolbar>
        {isAddContactFormVisible && (
          <Box p={2}>
            <AddContact
              title="Add Contact"
              nameError={nameError}
              emailError={emailError}
              phoneError={phoneError}
              handleInputChange={handleInputChange}
              toggleContactForm={toggleAddContactForm}
              handleContact={handleAddContact}
              contact={newContact}
            />
          </Box>
        )}
        {isEditFormVisible && (
          <Box p={2}>
            <AddContact
              title="Edit Contact"
              nameError={nameEditError}
              emailError={emailEditError}
              phoneError={phoneEditError}
              handleInputChange={handleEditInputChange}
              toggleContactForm={toggleEditForm}
              handleContact={handleUpdateContact}
              contact={editedContact}
            />
          </Box>
        )}
      </Paper>
      {searchQuery !== "" && rows.length === 0 ? (
        <Box p={2} textAlign="center">
          <Typography variant="h6">No matching results found.</Typography>
        </Box>
      ) : (
        <DataTable
          handleSortChange={handleSortChange}
          handleClick={handleClick}
          handleEditClick={handleEditClick}
          sortingOrder={sortingOrder}
          sortRows={sortRows}
          sortedColumn={sortedColumn}
          rows={rows}
          isSelected={isSelected}
          selectedContactIds={selectedContactIds}
        />
      )}
    </Box>
  );
}

export default EnhancedTable;
