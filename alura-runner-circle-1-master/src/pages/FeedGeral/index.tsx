import React from 'react';
import { useQuery, useMutation, gql, useReactiveVar } from '@apollo/client';
import { Box, CssBaseline, Grid, TextField, CircularProgress, Typography } from '@mui/material';
import { FeedContainer } from './styles';
import { Activity, ActivityCard } from '../../components/ActivityCard';
import { GET_SEARCH_QUERY, SET_SEARCH_QUERY, searchQueryVar } from '../../apolloClient';

export const GET_ACTIVITIES_BY_USER = gql`
  query GetActivitiesByUser($user: String) {
    mockActivities(user: $user) {
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
  const { data: localData } = useQuery(GET_SEARCH_QUERY)
  const [setSearchQuery] = useMutation(SET_SEARCH_QUERY)

  const user = useReactiveVar(searchQueryVar);

  const { data, loading, error } = useQuery(GET_ACTIVITIES_BY_USER, {
    variables: { user },
    skip: !user, // Pula a consulta se o usuário não estiver definido
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery({
      variables: {
        query
      }
    });
    searchQueryVar(query)
  };

  return (
    <Box flex="1">
      <CssBaseline />
      <TextField
        fullWidth
        placeholder="Digite o nome do usuário"
        variant="outlined"
        value={user}
        onChange={handleChange}
        style={{ marginBottom: '20px' }}
      />
      {loading && (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Typography color="error">Erro ao buscar dados: {error.message}</Typography>
        </Box>
      )}
      {!loading && !error && data && data.mockActivities.length === 0 && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Typography>Nenhuma atividade encontrada para o usuário "{user}".</Typography>
        </Box>
      )}
      {data && data.mockActivities.length > 0 && (
        <FeedContainer maxWidth="lg">
          <Grid container spacing={3}>
            {data.mockActivities.map((activity: Activity) => (
              <Grid item xs={12} sm={6} md={4} key={activity.id}>
                <ActivityCard activity={activity} />
              </Grid>
            ))}
          </Grid>
        </FeedContainer>
      )}
    </Box>
  );
}