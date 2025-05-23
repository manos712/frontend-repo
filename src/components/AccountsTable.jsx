import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, IconButton, Paper
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const AccountsTable = ({ accounts, onEdit, onDelete }) => (
  <TableContainer component={Paper} sx={{ mt: 2 }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Postal Address</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {accounts.map((acc) => (
          <TableRow key={acc._id}>
            <TableCell>{acc.account_name}</TableCell>
            <TableCell>{acc.postal_address}</TableCell>
            <TableCell>
              <IconButton onClick={() => onEdit(acc)}><EditIcon /></IconButton>
              <IconButton onClick={() => onDelete(acc._id)}><DeleteIcon /></IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default AccountsTable;
