import React, { useState } from 'react';
import {
  Box, TextField, Button, Grid, Typography, Alert, Snackbar, IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const BankerDirectoryForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [form, setForm] = useState({
    bankerName: '',
    associatedWith: '',
    locationCategories: [''],
    emailOfficial: '',
    emailPersonal: '',
    contact: '',
    product: [''],
  });

  const [error, setError] = useState('');
  const [successOpen, setSuccessOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (index: number, value: string) => {
    const updated = [...form.locationCategories];
    updated[index] = value;
    setForm({ ...form, locationCategories: updated });
  };

  const addLocationCategory = () => {
    setForm((prev) => ({
      ...prev,
      locationCategories: [...prev.locationCategories, ''],
    }));
  };

  const removeLocationCategory = (index: number) => {
    const updated = form.locationCategories.filter((_, i) => i !== index);
    setForm({ ...form, locationCategories: updated });
  };

  const handleProductChange = (index: number, value: string) => {
    const updated = [...form.product];
    updated[index] = value;
    setForm({ ...form, product: updated });
  };

  const addProduct = () => {
    setForm((prev) => ({
      ...prev,
      product: [...prev.product, ''],
    }));
  };

  const removeProduct = (index: number) => {
    const updated = form.product.filter((_, i) => i !== index);
    setForm({ ...form, product: updated });
  };

  const handleSubmit = async () => {
    if (!form.bankerName.trim()) {
      setError('Banker Name is required.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:3001/banker-directory/create-directories', form);
      console.log('Directory created:', res.data);

      setSuccessOpen(true);
      setForm({
        bankerName: '',
        associatedWith: '',
        locationCategories: [''],
        emailOfficial: '',
        emailPersonal: '',
        contact: '',
        product: [''],
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
        Create Banker Directory Entry
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required
            label="Banker Name"
            name="bankerName"
            value={form.bankerName}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required
            label="Associated With"
            name="associatedWith"
            value={form.associatedWith}
            onChange={handleChange}
          />
        </Grid>

        {/* Location Categories */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Location Categories
          </Typography>
          {form.locationCategories.map((category, index) => (
            <Grid container spacing={2} key={index}>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  label={`Category ${index + 1}`}
                  value={category}
                  onChange={(e) => handleLocationChange(index, e.target.value)}
                />
              </Grid>
              <Grid item xs={2}>
                {form.locationCategories.length > 1 && (
                  <IconButton onClick={() => removeLocationCategory(index)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          ))}
          <Button variant="outlined" onClick={addLocationCategory}>
            + Add Location
          </Button>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required
            label="Official Email"
            name="emailOfficial"
            value={form.emailOfficial}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Personal Email"
            name="emailPersonal"
            value={form.emailPersonal}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Contact"
            name="contact"
            value={form.contact}
            onChange={handleChange}
          />
        </Grid>

        {/* Product (Array) */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Product Categories
          </Typography>
          {form.product.map((item, index) => (
            <Grid container spacing={2} key={index}>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  label={`Product ${index + 1}`}
                  value={item}
                  onChange={(e) => handleProductChange(index, e.target.value)}
                />
              </Grid>
              <Grid item xs={2}>
                {form.product.length > 1 && (
                  <IconButton onClick={() => removeProduct(index)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          ))}
          <Button variant="outlined" onClick={addProduct}>
            + Add Product
          </Button>
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
        message="Banker Directory created successfully!"
      />
    </Box>
  );
};

export default BankerDirectoryForm;
