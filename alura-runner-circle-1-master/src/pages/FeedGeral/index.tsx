import { useQuery, gql } from '@apollo/client';
import { Box, CssBaseline, Grid } from '@mui/material';
import { SearchField, FeedContainer } from './styles';
import { ActivityCard, Activity } from '../../components/ActivityCard';

export const GET_ACTIVITIES = gql`
  query GetActivities {
     mockActivities {
      id
      time
      type
      distance
      calories
      bpm
      user
      userImage
      imageUrl
    }
  }
`;

export function FeedGeral() {

  const { data, loading, error } = useQuery(GET_ACTIVITIES);

  console.log('Data:', data);
  console.log('Loading:', loading);
  console.log('Error:', error);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box flex="1">
      <CssBaseline />
      <SearchField fullWidth placeholder="O que você procura?" variant="outlined" />
      <FeedContainer maxWidth="lg">
        <Grid container spacing={3}>
          {data.mockActivities.map((activity: Activity) => (
            <Grid item xs={12} sm={6} md={4} key={activity.id}>
              <ActivityCard activity={activity} />
            </Grid>
          ))}
        </Grid>
      </FeedContainer>
    </Box>
  );
}
