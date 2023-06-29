import { NextPage } from "next"
import { Card, CardHeader, Grid } from "@mui/material";
import { Layout } from "../components/layouts/";
import { EntryList } from '../components/ui/EntryList';
import { NewEntry } from '../components/ui/NewEntry';
import { useContext, useEffect } from "react";
import { EntriesContext } from "@/context/entries";

const HomePage: NextPage = () => {
  const { refreshEntries } = useContext(EntriesContext)

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <Layout title='Home - OpenJira'>

      <Grid container spacing={2}>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader />
            <CardHeader title='Pendientes' />
            <NewEntry />
            <EntryList status='pending' />
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader />
            <CardHeader title='En progreso' />
            <EntryList status='in-progress' />
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader />
            <CardHeader title='Completadas' />
            <EntryList status='finished' />
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default HomePage;


