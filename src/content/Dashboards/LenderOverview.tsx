// src/content/Lenders/LenderOverview.tsx
import {
  Box,
  Grid,
  Typography,
  Avatar,
  Paper
} from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Lender {
  _id: string;
  lenderName: string;
  location: string;
  managerName: string;
}

const LenderOverview = () => {
  const [lenders, setLenders] = useState<Lender[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/lenders/get-lenders')
      .then((res) => setLenders(res.data))
      .catch((err) => console.error('Error fetching lenders:', err));
  }, []);

  return (
    <Grid container spacing={3}>
      {lenders.map((lender) => (
        <Grid item xs={12} sm={6} md={4} key={lender._id}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Box display="flex" alignItems="center" mb={2}>
              <Avatar sx={{ mr: 2 }}>{lender.lenderName.charAt(0)}</Avatar>
              <Box>
                <Typography variant="h6">{lender.lenderName}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Location: {lender.location}
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2">
              <strong>RM/SM:</strong> {lender.managerName}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default LenderOverview;
