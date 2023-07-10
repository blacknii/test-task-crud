import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  Stack,
  Typography,
} from "@mui/material";

interface ChannelsTableProps {
  data: { key: string; name: string; count: string }[];
  handleClickAddNewModalOpen: () => void;
  handleClickEditModalOpen: (key: string, name: string, count: string) => void;
  handleClickDeleteModalOpen: (key: string) => void;
}

const ChannelsTable: React.FC<ChannelsTableProps> = ({
  data,
  handleClickAddNewModalOpen,
  handleClickEditModalOpen,
  handleClickDeleteModalOpen,
}) => {
  return (
    <Stack spacing={1} sx={{ width: "600px" }}>
      <Stack
        spacing={2}
        direction="row"
        sx={{ justifyContent: "space-between" }}
      >
        <Typography variant="h4" component="h2">
          Table
        </Typography>
        <Button
          onClick={handleClickAddNewModalOpen}
          variant="contained"
          color="success"
        >
          Add new
        </Button>
      </Stack>
      <TableContainer sx={{ maxHeight: "405px" }} component={Paper}>
        <Table stickyHeader aria-label="channels table">
          <TableHead>
            <TableRow>
              <TableCell>Channel</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.key}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.count}</TableCell>
                <TableCell align="center" sx={{ width: "0" }}>
                  <Stack spacing={1} direction="row">
                    <Button
                      onClick={() =>
                        handleClickEditModalOpen(row.key, row.name, row.count)
                      }
                      variant="contained"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleClickDeleteModalOpen(row.key)}
                      variant="contained"
                      color="error"
                    >
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default ChannelsTable;
