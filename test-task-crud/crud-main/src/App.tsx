import { ChangeEvent, useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";
import axios from "axios";
import "./App.css";
import PieChart from "./components/PieChart";
import ChannelsTable from "./components/ChannelsTable";
import DeleteModal from "./components/modals/DeleteModal";
import EditModalOpen from "./components/modals/EditModalOpen";
import AddNewModal from "./components/modals/AddNewModal";

interface Channel {
  key: string;
  count: string;
  name: string;
}

const databaseUrl = "http://localhost/crud-backend/";

function App() {
  const [data, setData] = useState<Channel[]>([]);

  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [addNewModalOpen, setAddNewModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

  const [inputName, setInputName] = useState<string>("");
  const [inputAmount, setInputAmount] = useState<string>("");
  const [elementId, setElementId] = useState<string>("");

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputName(e.target.value);
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputAmount(e.target.value);
  };

  async function fetchData() {
    try {
      const response = await axios.get<Record<string, Channel>>(
        databaseUrl + "get.php"
      );

      const transformedData = Object.entries(response.data).map(
        ([key, value]) => {
          return {
            key,
            count: value.count,
            name: value.name,
          };
        }
      );

      setData([...transformedData]);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    void fetchData();
  }, []);

  async function addData() {
    try {
      const response = await axios.post(
        databaseUrl + "add.php",
        {
          name: inputName,
          count: inputAmount,
        },
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      void fetchData();
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleClickAddNewModalOpen = () => {
    setAddNewModalOpen(true);
  };

  const handleAddNewModalClose = () => {
    setAddNewModalOpen(false);
    setInputName("");
    setInputAmount("");
  };

  const removeData = async (): Promise<void> => {
    try {
      const response = await axios.get(
        `${databaseUrl}delete.php?id=${elementId}`
      );

      void fetchData();
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickDeleteModalOpen = (id: string) => {
    setElementId(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
    setElementId("");
  };

  async function editData() {
    try {
      const response = await axios.post(databaseUrl + "edit.php", {
        id: elementId,
        name: inputName,
        count: inputAmount,
      });

      console.log(response.data);
      void fetchData();
    } catch (error) {
      console.error(error);
    }
  }

  const handleClickEditModalOpen = (
    id: string,
    name: string,
    amount: string
  ) => {
    setElementId(id);
    setInputName(name);
    setInputAmount(amount);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setInputName("");
    setInputAmount("");
    setElementId("");
  };

  return (
    <>
      <DeleteModal
        deleteModalOpen={deleteModalOpen}
        handleDeleteModalClose={handleDeleteModalClose}
        removeData={removeData}
      />
      <AddNewModal
        addNewModalOpen={addNewModalOpen}
        handleAddNewModalClose={handleAddNewModalClose}
        inputName={inputName}
        handleNameChange={handleNameChange}
        inputAmount={inputAmount}
        handleAmountChange={handleAmountChange}
        addData={addData}
      />
      <EditModalOpen
        editModalOpen={editModalOpen}
        handleEditModalClose={handleEditModalClose}
        inputName={inputName}
        handleNameChange={handleNameChange}
        inputAmount={inputAmount}
        handleAmountChange={handleAmountChange}
        editData={editData}
      />
      <Stack spacing={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          Customer Acquisition Channel CRUD
        </Typography>
        <Stack
          spacing={4}
          direction="row"
          sx={{ flexWrap: "wrap", justifyContent: "center" }}
        >
          <ChannelsTable
            data={data}
            handleClickAddNewModalOpen={handleClickAddNewModalOpen}
            handleClickEditModalOpen={handleClickEditModalOpen}
            handleClickDeleteModalOpen={handleClickDeleteModalOpen}
          />
          <PieChart data={data} />
        </Stack>
      </Stack>
    </>
  );
}

export default App;
