import axios from "axios";
const API_BASE_URL = "http://localhost:8000";

export async function fetchContacts() {
  try {
    const response = await axios.get(`${API_BASE_URL}` + "/api/contacts");
    return response.data;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return [];
  }
}

export async function createContact(newContact) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/contacts`,
      newContact
    );
    return response.data;
  } catch (error) {
    console.error("Error creating contact:", error);
    return null;
  }
}

// Function to update an existing contact by ID
export async function updateContact(contactId, updatedContact) {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/contacts/${contactId}`,
      updatedContact
    );
    return response.data;
  } catch (error) {
    console.error("Error updating contact:", error);
    return null;
  }
}

// Function to delete a contact by ID
export async function deleteContact(contactId) {
  try {
    await axios.delete(`${API_BASE_URL}/api/contacts/${contactId}`);
    return true; // Deletion was successful
  } catch (error) {
    console.error("Error deleting contact:", error);
    return false; // Deletion failed
  }
}
