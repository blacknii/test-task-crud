import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface DeleteModalProps {
  deleteModalOpen: boolean;
  handleDeleteModalClose: () => void;
  removeData: () => Promise<void>;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  deleteModalOpen,
  handleDeleteModalClose,
  removeData,
}) => {
  return (
    <Dialog open={deleteModalOpen} onClose={handleDeleteModalClose}>
      <DialogTitle>Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this element?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteModalClose} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={() => {
            removeData()
              .then(handleDeleteModalClose)
              .catch((error) => console.error(error));
          }}
          variant="contained"
          color="error"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
