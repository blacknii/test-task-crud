import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

interface Props {
  editModalOpen: boolean;
  handleEditModalClose: () => void;
  inputName: string;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputAmount: string;
  handleAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  editData: () => Promise<void>;
}

const EditModalOpen: React.FC<Props> = ({
  editModalOpen,
  handleEditModalClose,
  inputName,
  handleNameChange,
  inputAmount,
  handleAmountChange,
  editData,
}) => {
  return (
    <Dialog open={editModalOpen} onClose={handleEditModalClose}>
      <DialogTitle>Edit</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          value={inputName}
          onChange={handleNameChange}
        />
        <TextField
          autoFocus
          margin="dense"
          id="amount"
          label="Amount"
          type="number"
          fullWidth
          variant="standard"
          value={inputAmount}
          onChange={handleAmountChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleEditModalClose} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={() => {
            editData()
              .then(handleEditModalClose)
              .catch((error) => console.error(error));
          }}
          variant="contained"
        >
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModalOpen;
