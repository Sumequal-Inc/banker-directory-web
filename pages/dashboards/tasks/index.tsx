import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import { ChangeEvent, useState } from 'react';
import PageHeader from '@/content/Dashboards/Tasks/PageHeader';
import Footer from '@/components/Footer';
import {
  Grid,
  Tab,
  Tabs,
  Divider,
  Container,
  Card,
  Box,
  useTheme,
  styled,
  Paper,
  Typography,
  Fade
} from '@mui/material';
import PageTitleWrapper from '@/components/PageTitleWrapper';

import TeamOverview from '@/content/Dashboards/Tasks/TeamOverview';
import TasksAnalytics from '@/content/Dashboards/Tasks/TasksAnalytics';
import Performance from '@/content/Dashboards/Tasks/Performance';
import Projects from '@/content/Dashboards/Tasks/Projects';
import Checklist from '@/content/Dashboards/Tasks/Checklist';
import Profile from '@/content/Dashboards/Tasks/Profile';
import TaskSearch from '@/content/Dashboards/Tasks/TaskSearch';

import PeopleIcon from '@mui/icons-material/People';
import SearchIcon from '@mui/icons-material/Search';

const TabsContainerWrapper = styled(Box)(
  ({ theme }) => `
    padding: ${theme.spacing(0, 1)};
    margin-bottom: ${theme.spacing(2)};
    border-bottom: 1px solid ${theme.palette.divider};

    .MuiTabs-root {
      min-height: 40px;
    }

    .MuiTab-root {
      font-size: ${theme.typography.pxToRem(13)};
      padding: ${theme.spacing(1.2, 2)};
      min-height: 40px;
      text-transform: none;
      gap: ${theme.spacing(1)};
    }

    .MuiTabs-indicator {
      display: flex;
      justify-content: center;

      &::after {
        content: '';
        width: 30px;
        height: 3px;
        background-color: ${theme.palette.primary.main};
        border-radius: 2px;
      }
    }
  `
);

const SectionCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  background: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  borderRadius: theme.shape.borderRadius
}));

function DashboardTasks() {
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState<string>('bankers');

  const tabs = [
    { value: 'bankers', label: 'Overview', icon: <PeopleIcon fontSize="small" /> },
    // { value: 'bankersSearch', label: 'Search', icon: <SearchIcon fontSize="small" /> }
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
        <PageHeader />
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
              <Tab
                key={tab.value}
                value={tab.value}
                label={
                  <Box display="flex" alignItems="center">
                    {tab.icon}
                    {tab.label}
                  </Box>
                }
              />
            ))}
          </Tabs>
        </TabsContainerWrapper>

        <Fade in timeout={400}>
          <SectionCard>
            <Grid container spacing={3}>
              {currentTab === 'bankers' && (
                <>
                  <Grid item xs={12}>
                    <TeamOverview />
                  </Grid>

                  <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={8}>
                        <TasksAnalytics />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Performance />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Projects />
                  </Grid>

                  <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Checklist />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Paper
                          elevation={4}
                          sx={{
                            p: 3,
                            backgroundColor: theme.palette.grey[100],
                            borderRadius: 2,
                            height: '100%'
                          }}
                        >
                          <Typography variant="h6" gutterBottom>
                            Banker Profile
                          </Typography>
                          <Profile />
                        </Paper>
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              )}
{/* 
              {currentTab === 'bankersSearch' && (
                <Grid item xs={12}>
                  <TaskSearch />
                </Grid>
              )} */}
            </Grid>
          </SectionCard>
        </Fade>
      </Container>

      <Footer />
    </>
  );
}

DashboardTasks.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardTasks;
