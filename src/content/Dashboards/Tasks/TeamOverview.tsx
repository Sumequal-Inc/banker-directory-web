import {
  Box,
  Grid,
  Typography,
  Avatar,
  Tooltip,
  IconButton,
  List,
  Divider,
  useTheme
} from '@mui/material';
import PhoneTwoToneIcon from '@mui/icons-material/PhoneTwoTone';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
// import MessageTwoToneIcon from '@mui/icons-material/MessageTwoTone';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Member {
  fullName: string;
  profileImage: string;
  designation: string;
  currentInstitutionName: string;
  dateOfJoining: string;
  totalExperience: string;
  contact: string;
  email: string;
  location: string;
  rating?: number;
}

const TeamOverview = () => {
  const theme = useTheme();
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3001/directory/get-directories');
        setMembers(Array.isArray(res.data.data) ? res.data.data : res.data);
      } catch (error) {
        console.error('Error fetching directory:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Grid container spacing={4}>
      {members.map((member, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Box
            textAlign="center"
            border="1px solid #ddd"
            borderRadius={2}
            p={3}
            boxShadow={2}
            bgcolor={theme.palette.background.paper}
          >
            <Avatar
              sx={{
                mx: 'auto',
                mb: 1.5,
                width: theme.spacing(12),
                height: theme.spacing(12)
              }}
              variant="rounded"
              alt={member.fullName}
              src={member.profileImage}
            />

            <Typography variant="h4" gutterBottom>
              {member.fullName}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              {member.designation} {member.currentInstitutionName}
            </Typography>

            {/* Icons with Hover Tooltips */}
            <Box py={2} display="flex" alignItems="center" justifyContent="center">
              <Tooltip title={member.contact || 'No contact available'} arrow>
                <IconButton color="primary" sx={{ mx: 0.5 }}>
                  <PhoneTwoToneIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={member.email || 'No email available'} arrow>
                <IconButton color="primary" sx={{ mx: 0.5 }}>
                  <EmailTwoToneIcon />
                </IconButton>
              </Tooltip>
              {/* <Tooltip title="Send message" arrow>
                <IconButton color="primary" sx={{ mx: 0.5 }}>
                  <MessageTwoToneIcon />
                </IconButton>
              </Tooltip> */}
            </Box>

            <List sx={{ textAlign: 'left', mt: 2 }}>
              <Box component="li" py={1}>
                <Typography variant="subtitle2">Join Date</Typography>
                <Typography variant="subtitle2" color="text.primary">
                  {new Date(member.dateOfJoining).toLocaleDateString()}
                </Typography>
              </Box>
              <Divider />
              <Box component="li" py={1}>
                <Typography variant="subtitle2">Experience</Typography>
                <Typography variant="subtitle2" color="text.primary">
                  {member.totalExperience}
                </Typography>
              </Box>
              <Divider />
              <Box component="li" py={1}>
                <Typography variant="subtitle2">bank</Typography>
                <Typography variant="subtitle2" color="text.primary">
                  {member.bankName}
                </Typography>
              </Box>
              <Divider />
              <Box component="li" py={1}>
                <Typography variant="subtitle2">Email</Typography>
                <Typography variant="subtitle2" color="text.primary">
                  {member.email}
                </Typography>
              </Box>
              <Divider />
              <Box component="li" py={1}>
                <Typography variant="subtitle2">Location</Typography>
                <Typography variant="subtitle2" color="text.primary">
                  {member.location}
                </Typography>
              </Box>
            </List>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default TeamOverview;
