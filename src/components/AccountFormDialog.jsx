import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField
} from '@mui/material';

const AccountFormDialog = ({ open, onClose, onSave, initialData }) => {
  const [form, setForm] = useState({ account_name: '', postal_address: '' });

  useEffect(() => {
    if (initialData) setForm(initialData);
    else setForm({ account_name: '', postal_address: '' });
  }, [initialData]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (!form.account_name) return;
    onSave(form);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{form._id ? 'Edit' : 'Add'} Account</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Account Name"
          name="account_name"
          value={form.account_name}
          onChange={handleChange}
          margin="dense"
        />
        <TextField
          fullWidth
          label="Postal Address"
          name="postal_address"
          value={form.postal_address}
          onChange={handleChange}
          multiline
          rows={4}
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          {form._id ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AccountFormDialog;
