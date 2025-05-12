import {
  Box,
  Grid,
  Typography,
  Avatar,
  Badge,
  Tooltip,
  useTheme,
  LinearProgress,
  styled
} from '@mui/material';
import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import Text from 'src/components/Text';
import axios from 'axios';

const DotLegend = styled('span')(({ theme }) => `
  border-radius: 22px;
  width: ${theme.spacing(1.5)};
  height: ${theme.spacing(1.5)};
  display: inline-block;
  margin-right: ${theme.spacing(0.5)};
  border: ${theme.colors.alpha.white[100]} solid 2px;
`);

const AvatarWrapper = styled(Avatar)(({ theme }) => `
  width: ${theme.spacing(7)};
  height: ${theme.spacing(7)};
`);

const LinearProgressWrapper = styled(LinearProgress)(({ theme }) => `
  flex-grow: 1;
  height: 10px;
  &.MuiLinearProgress-root {
    background-color: ${theme.colors.alpha.black[10]};
  }
  .MuiLinearProgress-bar {
    border-radius: ${theme.general.borderRadiusXl};
  }
`);

const TeamOverview = () => {
  const theme = useTheme();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3001/directory/get-directories');
        console.log(res,"edfrefdcsa")
        setMembers(res.data);
      } catch (error) {
        console.error('Error fetching directory:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Grid container spacing={4}>
      {members.map((member, index) => {
        const progress = (member.tasksCompleted / member.totalTasks) * 100;
        const statusColor =
          member.status === 'online'
            ? theme.colors.success.main
            : theme.colors.error.main;

        return (
         <Grid item xs={12} md={4} key={index}>
  <Box p={2} border="1px solid #ddd" borderRadius={2} boxShadow={2}>
    <Box display="flex" alignItems="center" pb={2}>
      <Badge
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        overlap="circular"
        badgeContent={
          <Tooltip
            arrow
            placement="top"
            title={
              member.status === 'online'
                ? 'Online since'
                : 'Offline since'
            }
          >
            <DotLegend style={{ background: statusColor }} />
          </Tooltip>
        }
      >
        <AvatarWrapper alt={member.fullName} src={member.profileImage} />
      </Badge>
      <Box sx={{ ml: 2 }}>
        <Typography variant="h5">{member.fullName}</Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {member.designation} at {member.currentInstitutionName}
        </Typography>
      </Box>
    </Box>

    <Typography variant="body2"><strong>Date of Joining:</strong> {new Date(member.dateOfJoining).toLocaleDateString()}</Typography>
    <Typography variant="body2"><strong>Total Experience:</strong> {member.totalExperience}</Typography>
    <Typography variant="body2"><strong>Contact:</strong> {member.contact}</Typography>
    <Typography variant="body2"><strong>Email:</strong> {member.email}</Typography>
    <Typography variant="body2" gutterBottom><strong>Location:</strong> {member.location}</Typography>

    {member.tasksCompleted && member.totalTasks && (
      <>
        <Typography variant="subtitle2" gutterBottom mt={2}>
          <Text color="black">{member.tasksCompleted}</Text> out of{' '}
          <Text color="black">{member.totalTasks}</Text> tasks completed
        </Typography>
        <LinearProgressWrapper
          value={(member.tasksCompleted / member.totalTasks) * 100}
          color="primary"
          variant="determinate"
        />
      </>
    )}

    {/* Previous Experience */}
    <Box mt={3}>
      <Typography variant="h6" gutterBottom>Previous Experience</Typography>
      {member.previousExperience?.map((exp, expIndex) => (
        <Box key={expIndex} pl={1.5} mb={1} borderLeft="3px solid #1976d2">
          <Typography variant="subtitle2">{exp.currentInstitutionName}</Typography>
          <Typography variant="body2">{exp.role}</Typography>
          <Typography variant="body2">
            {new Date(exp.startDate).toLocaleDateString()} – {new Date(exp.endDate).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" fontStyle="italic">{exp.description}</Typography>
        </Box>
      ))}
    </Box>
  </Box>
</Grid>

        );
      })}
    </Grid>
  );
};

export default TeamOverview;
