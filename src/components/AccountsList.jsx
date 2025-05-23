import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AccountsList() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/accounts/')
      .then(res => setAccounts(res.data))
      .catch(err => toast.error("Failed to fetch accounts"));
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>Accounts</Typography>
      {accounts.map(account => (
        <Card key={account.account_id} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6">{account.account_name}</Typography>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
              {account.postal_address}
            </Typography>
          </CardContent>
        </Card>
      ))}
      <ToastContainer />
    </Box>
  );
}

export default AccountsList;
