import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  Alert,
  Snackbar
} from '@mui/material';
import axios from 'axios';

const LenderForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [form, setForm] = useState({
    lenderName: '',
    location: '',
    managerName: ''
  });

  const [error, setError] = useState('');
  const [successOpen, setSuccessOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!form.lenderName.trim()) {
      setError('Lender Name is required.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:3001/lenders/create-lender', form);
      console.log('Lender created:', res.data);

      setSuccessOpen(true);
      setForm({
        lenderName: '',
        location: '',
        managerName: ''
      });
      setError('');
      onSuccess();
    } catch (err: any) {
      console.error('Submit error:', err.response?.data || err.message);
      const message = err?.response?.data?.message || 'Something went wrong';
      setError(Array.isArray(message) ? message.join(', ') : message);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Add New Lender
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            label="Lender Name"
            name="lenderName"
            value={form.lenderName}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Location"
            name="location"
            value={form.location}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="RM / SM Name"
            name="managerName"
            value={form.managerName}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>

      <Snackbar
        open={successOpen}
        autoHideDuration={3000}
        onClose={() => setSuccessOpen(false)}
        message="Lender added successfully!"
      />
    </Box>
  );
};

export default LenderForm;
