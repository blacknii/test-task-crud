import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  DialogTitle,
} from "@mui/material";
import React from "react";

interface AddNewModalProps {
  addNewModalOpen: boolean;
  handleAddNewModalClose: () => void;
  inputName: string;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputAmount: string;
  handleAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  addData: () => Promise<void>;
}

const AddNewModal: React.FC<AddNewModalProps> = ({
  addNewModalOpen,
  handleAddNewModalClose,
  inputName,
  handleNameChange,
  inputAmount,
  handleAmountChange,
  addData,
}) => {
  return (
    <Dialog open={addNewModalOpen} onClose={handleAddNewModalClose}>
      <DialogTitle>Add New</DialogTitle>
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
        <Button onClick={handleAddNewModalClose} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={() => {
            addData()
              .then(handleAddNewModalClose)
              .catch((error) => console.error(error));
          }}
          variant="contained"
          color="success"
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNewModal;
