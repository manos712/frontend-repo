import React, { useState, useEffect } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AccountsTable from './components/AccountsTable';
import AccountsList from './components/AccountsList';

import AccountFormDialog from './components/AccountFormDialog';
import axios from 'axios';

const App = () => {
  const [accounts, setAccounts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editData, setEditData] = useState(null);


  const fetchAccounts = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/accounts`);
        console.log(res.data);

        setAccounts(res.data);
    }
    catch (err) {
      console.error("Error fetching accounts:", err);
    }


    console.log(import.meta.env.VITE_API_BASE_URL);
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleAdd = () => {
    setEditData(null);
    setOpenDialog(true);
  };

  const handleEdit = (account) => {
    setEditData(account);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this account?')) {
      await axios.delete(`http://${import.meta.env.VITE_API_BASE_URL}/accounts/${id}`);
      toast.success('Deleted!');
      fetchAccounts();
    }
  };

  const handleSave = async (data) => {
    try {
      if (data._id) {
        await axios.put(`http://${import.meta.env.VITE_API_BASE_URL}/accounts/${data._id}`, data);
        toast.success('Updated!');
      } else {
        await axios.post(`http://${import.meta.env.VITE_API_BASE_URL}/accounts`, data);
        toast.success('Added!');
      }
      fetchAccounts();
    } catch (err) {
      toast.error('Error saving account');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Accounts Manager</Typography>
      <Button variant="contained" onClick={handleAdd}>Add Account</Button>
      <AccountsTable accounts={accounts} onEdit={handleEdit} onDelete={handleDelete} />
      <AccountFormDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSave={handleSave}
        initialData={editData}
      />
      <ToastContainer />
      <AccountsList></AccountsList>
    </Container>
  );
};

export default App;
