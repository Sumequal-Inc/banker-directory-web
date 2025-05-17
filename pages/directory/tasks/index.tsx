import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import { ChangeEvent, useState, useEffect } from 'react';
import PageHeader from '@/content/Dashboards/Tasks/PageHeader';
import Footer from '@/components/Footer';
import { Box, Grid, Tab, Tabs, Typography, Avatar, Paper, Button, Chip, Divider, Stack, TextField, Container, Card, InputAdornment } from '@mui/material';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { styled } from '@mui/material/styles';
import ClearIcon from '@mui/icons-material/Clear'; // Import Clear Icon

// Define the interface for Banker
interface Banker {
  _id: string;
  bankerName: string;
  associatedWith: string;
  locationCategories: string[];
  emailOfficial: string;
  emailPersonal?: string;
  contact: string;
  product: string[];
}

// BankerOverview Component to display all bankers or filter them by location
const BankerOverview = () => {
  const [bankers, setBankers] = useState<Banker[]>([]);
  const [filteredBankers, setFilteredBankers] = useState<Banker[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  // Fetch the bankers from the backend
  useEffect(() => {
    axios
      .get('http://localhost:3001/banker-directory/get-directories')
      .then((res) => {
        setBankers(res.data);
        setFilteredBankers(res.data);  // Set filteredBankers initially to all bankers
      })
      .catch((err) => console.error('Error fetching bankers:', err));
  }, []);

  // Filter bankers based on the search term
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);

    if (event.target.value === '') {
      setFilteredBankers(bankers);  // If search is cleared, show all bankers
    } else {
      const filtered = bankers.filter((banker) =>
        banker.locationCategories.some((location) =>
          location.toLowerCase().includes(event.target.value.toLowerCase())
        )
      );
      setFilteredBankers(filtered);  // Filter bankers based on location
    }
  };

  // Function to clear the search term
  const handleClearSearch = () => {
    setSearchTerm('');
    setFilteredBankers(bankers);  // Reset the filtered bankers to all
  };

  const handleViewMore = (id: string) => {
    router.push(`/management/bankers/${id}`);
  };

  return (
    <Grid container spacing={4} padding={2}>
      <Grid item xs={12}>
        {/* Search bar to filter bankers by location */}
        <TextField
          label="Search by Location"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          fullWidth
          sx={{ mb: 1, maxWidth: 400 }}  // Set a max width for the search input
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Typography>🔍</Typography> {/* Add a search icon */}
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {searchTerm && (
                  <ClearIcon
                    onClick={handleClearSearch}
                    sx={{ cursor: 'pointer', color: 'text.secondary'}} // Clear icon
                  />
                )}
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      {filteredBankers.map((banker) => (
        <Grid item xs={12} sm={6} md={4} key={banker._id}>
          <Paper elevation={6} sx={{ p: 3, borderRadius: 3, height: '100%' }}>
            <Box display="flex" alignItems="center" mb={2}>
              <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                {banker.bankerName.charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="h6">{banker.bankerName}</Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {banker.associatedWith}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Typography variant="subtitle2" gutterBottom>
              Location Categories:
            </Typography>
            <Stack direction="row" flexWrap="wrap" spacing={1} mb={2}>
              {banker.locationCategories.map((loc, index) => (
                <Chip key={index} label={loc} size="small" variant="outlined" />
              ))}
            </Stack>

            <Typography variant="subtitle2">Products:</Typography>
            <Stack direction="row" flexWrap="wrap" spacing={1} mb={2}>
              {(banker.product || []).map((prod, index) => (
                <Chip key={index} label={prod} size="small" color="success" variant="outlined" />
              ))}
            </Stack>

            <Box mb={1}>
              <Typography variant="body2" gutterBottom>
                <strong>Official Email:</strong> {banker.emailOfficial}
              </Typography>
              {banker.emailPersonal && (
                <Typography variant="body2" gutterBottom>
                  <strong>Personal Email:</strong> {banker.emailPersonal}
                </Typography>
              )}
              <Typography variant="body2">
                <strong>Contact:</strong> {banker.contact}
              </Typography>
            </Box>

            {/* <Button
              variant="contained"
              color="primary"
              size="small"
              fullWidth
              onClick={() => handleViewMore(banker._id)}
              sx={{ mt: 2 }}
            >
              View More Details
            </Button> */}
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

// Define TabsContainerWrapper for styling tabs
const TabsContainerWrapper = styled(Box)(({ theme }) => ({
  padding: `0 ${theme.spacing(2)}`,
  position: 'relative',
  bottom: '-1px',
}));

// Main Component with Tabs and Overview/Searching Logic
const LendersTasks = () => {
  const [currentTab, setCurrentTab] = useState<string>('overview');
  const theme = useTheme();  // Now works since useTheme is imported

  const tabs = [
    { value: 'overview', label: 'Bankers Directory' },
    // { value: 'search', label: 'Search Directories' }
  ];

  const handleTabsChange = (_event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  return (
    <>
      <Head>
        <title>Bankers Directory</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader onCreated={() => window.location.reload()} />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <TabsContainerWrapper>
          <Tabs
            onChange={handleTabsChange}
            value={currentTab}
            variant="scrollable"
            scrollButtons="auto"
            textColor="primary"
            indicatorColor="primary"
          >
            {tabs.map((tab) => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </Tabs>
        </TabsContainerWrapper>
        <Card variant="outlined">
          <Grid container>
            {currentTab === 'overview' && (
              <Grid item xs={12}>
                <Box p={4}>
                  {/* Banker Overview */}
                  <BankerOverview />
                </Box>
              </Grid>
            )}
            {currentTab === 'search' && (
              <Grid item xs={12}>
                <Box p={4}>
                  {/* Search tab content */}
                  <Box>Search functionality is now integrated in the Overview tab</Box>
                </Box>
              </Grid>
            )}
          </Grid>
        </Card>
      </Container>
      <Footer />
    </>
  );
};

LendersTasks.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default LendersTasks;
