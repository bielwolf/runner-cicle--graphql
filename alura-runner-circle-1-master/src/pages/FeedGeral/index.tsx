import React, { useState } from 'react';
import { useLazyQuery, gql, useMutation, useQuery } from '@apollo/client';
import { Box, CssBaseline, Grid, TextField, CircularProgress, Typography, Button } from '@mui/material';
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
  const { data: localData } = useQuery(GET_SEARCH_QUERY);
  const [setSearchQuery] = useMutation(SET_SEARCH_QUERY);
  const [inputValue, setInputValue] = useState(''); // Estado local para armazenar o valor do input

  const [loadActivities, { called, data, loading, error }] = useLazyQuery(GET_ACTIVITIES_BY_USER, {
    variables: { user: inputValue }, // Usar o valor do estado local
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // Atualizar somente o estado local
  };

  const handleSearch = () => {
    if (inputValue) {
      loadActivities(); // Carregar atividades baseadas no estado local, não na variável reativa
    }
  };

  return (
    <Box flex="1">
      <CssBaseline />
      <TextField
        fullWidth
        placeholder="Digite o nome do usuário"
        variant="outlined"
        value={inputValue} // Usar o estado local
        onChange={handleChange}
        style={{ marginBottom: '20px' }}
      />
      <Button variant="contained" color="primary" onClick={handleSearch} style={{ marginBottom: '20px' }}>
        Buscar
      </Button>
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
      {!loading && !error && called && data && data.mockActivities.length === 0 && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Typography>Nenhuma atividade encontrada para o usuário "{inputValue}".</Typography>
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