import { Close, Send } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import DataGridComponent from "../../../components/dataGrid/DataGridComponent";
import { useValue } from "../../../context/ContextProvider";
import { customerData } from "../../../data";

const Customer = ({ setSelectedLink, link }) => {
  const [customerList, setCustomerList] = useState([{}]);
  const [loading, setLoading] = useState(true);

  const {
    state: { openLogin },
    dispatch,
  } = useValue();

  const fullNameRef = useRef();
  const addressRef = useRef();
  const orderedRef = useRef();

  const handleClose = () => {
    dispatch({ type: "CLOSE_LOGIN" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    setSelectedLink(link);
    fetchAPI();
  }, []);

  const fetchAPI = async () => {
    setLoading(true);
    setCustomerList(customerData);
    setLoading(false);
  };

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "full_name", headerName: "Full Name", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
    { field: "ordered", headerName: "Ordered", flex: 1 },
  ];

  return (
    <Box display="flex" flexDirection="column">
      <Paper elevation={3}>
        <Stack direction="row" spacing={2} m={3} justifyContent="space-between">
          <Typography variant="h5">Customer List</Typography>

          <Button
            variant="contained"
            onClick={() => dispatch({ type: "OPEN_LOGIN" })}
          >
            Add New Customer
          </Button>
        </Stack>
        <Dialog open={openLogin} onClose={handleClose}>
          <DialogTitle>
            Customer Information
            <IconButton
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                color: (theme) => theme.palette.grey[500],
              }}
              onClick={handleClose}
            >
              <Close />
            </IconButton>
            <form onSubmit={handleSubmit}>
              <DialogContent dividers>
                <DialogContentText>
                  Please fill customer information in the fields below:
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="normal"
                  variant="standard"
                  id="fullNameRef"
                  label="Full Name"
                  type="text"
                  fullWidth
                  inputRef={fullNameRef}
                  inputProps={{ minLength: 2 }}
                  required
                />
                <TextField
                  margin="normal"
                  variant="standard"
                  id="addressRef"
                  label="Address"
                  type="text"
                  fullWidth
                  inputRef={addressRef}
                  inputProps={{ minLength: 2 }}
                  required
                />
                <TextField
                  margin="normal"
                  variant="standard"
                  id="orderedRef"
                  label="Ordered"
                  type="number"
                  fullWidth
                  inputRef={orderedRef}
                  inputProps={{ minLength: 2 }}
                  required
                />
              </DialogContent>
              <DialogActions sx={{ px: "19px" }}>
                <Button type="submit" variant="contained" endIcon={<Send />}>
                  Submit
                </Button>
              </DialogActions>
            </form>
          </DialogTitle>
        </Dialog>
        <Box m={2}>
          {loading ? (
            <CircularProgress color="secondary" />
          ) : (
            <>
              <DataGridComponent rows={customerList} columns={columns} />
            </>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Customer;
