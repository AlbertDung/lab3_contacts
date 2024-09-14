import { createSlice, configureStore } from "@reduxjs/toolkit";

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    contacts: [], // List of contacts
    loading: false,
    error: false,
  },
  reducers: {
    fetchContactsLoading: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchContactsSuccess: (state, action) => {
      state.contacts = action.payload;
      state.loading = false;
      state.error = false;
    },
    fetchContactsError: (state) => {
      state.loading = false;
      state.error = true;
    },
    toggleFavorite: (state, action) => {
      // Find the contact by phone number and toggle the favorite status
      const contact = state.contacts.find(
        (contact) => contact.phone === action.payload.phone
      );
      if (contact) {
        contact.favorite = !contact.favorite; // Toggle the favorite status
      }
    },
  },
});

// Export actions
export const {
  fetchContactsLoading,
  fetchContactsSuccess,
  fetchContactsError,
  toggleFavorite, // Export the new action for toggling favorites
} = contactsSlice.actions;

// Create and export the store
export default configureStore({
  reducer: {
    contacts: contactsSlice.reducer,
  },
});
