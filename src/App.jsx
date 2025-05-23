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

  const VITE_API_BASE_URL = 'https://mern3-backend-hjct.onrender.com/';

  const fetchAccounts = async () => {
    //const res = await axios.get('http://localhost:5000/accounts');
    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/accounts`);

    setAccounts(res.data);
  };
console.log("API BASE URL:", import.meta.env.VITE_API_BASE_URL);

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
      await axios.delete(`http://localhost:5000/accounts/${id}`);
      toast.success('Deleted!');
      fetchAccounts();
    }
  };

  const handleSave = async (data) => {
    try {
      if (data._id) {
        await axios.put(`http://localhost:5000/accounts/${data._id}`, data);
        toast.success('Updated!');
      } else {
        await axios.post('http://localhost:5000/accounts', data);
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
