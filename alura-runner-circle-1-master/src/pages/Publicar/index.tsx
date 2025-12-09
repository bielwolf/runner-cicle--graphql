import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { CssBaseline, TextField, Box, CircularProgress, Typography } from '@mui/material';
import { Layout, StyledButton } from './styles';
import { GET_ACTIVITIES_BY_USER } from '../FeedGeral';

const ADD_ACTIVITY = gql`
  mutation AddActivity(
    $time: String!,
    $type: String!,
    $distance: String!,
    $calories: String!,
    $bpm: String!,
    $user: String!,
    $userImage: String!,
    $imageUrl: String!
  ) {
    addActivity(
      time: $time,
      type: $type,
      distance: $distance,
      calories: $calories,
      bpm: $bpm,
      user: $user,
      userImage: $userImage,
      imageUrl: $imageUrl
    ) {
      id
    }
  }
`;

type FormState = {
  time: string;
  type: string;
  distance: string;
  calories: string;
  bpm: string;
  user: string;
  userImage: string;
  imageUrl: string;
};

type ActivityType = {
  id: string;
  time: string;
  type: string;
  distance: string;
  calories: string;
  bpm: string;
  user: string;
  userImage: string;
  imageUrl: string;
};

type QueryResult = {
  mockActivities: ActivityType[];
};

const validateForm = (state: FormState) => {
  const errors: { [key: string]: string } = {};
  if (!state.time) errors.time = "Horário é obrigatório";
  if (!state.type) errors.type = "Tipo de atividade é obrigatório";
  if (!state.distance) errors.distance = "Distância é obrigatória";
  if (!state.calories) errors.calories = "Calorias são obrigatórias";
  if (!state.bpm) errors.bpm = "Batimentos são obrigatórios";
  if (!state.user) errors.user = "Usuário é obrigatório";
  if (!state.userImage) errors.userImage = "Imagem do usuário é obrigatória";
  if (!state.imageUrl) errors.imageUrl = "URL da imagem da atividade é obrigatória";
  return errors;
};

export function Publicar() {
  const [formState, setFormState] = useState<FormState>({
    time: '',
    type: '',
    distance: '',
    calories: '',
    bpm: '',
    user: '',
    userImage: '',
    imageUrl: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [addActivity, { loading, error }] = useMutation(ADD_ACTIVITY, {
    variables: formState,
    update: (cache, { data: { addActivity } }) => {
    // Atualiza o cache manualmente
      const data = cache.readQuery<QueryResult>({ query: GET_ACTIVITIES_BY_USER, variables: { user: formState.user } });
      if (data) {
        cache.writeQuery({
          query: GET_ACTIVITIES_BY_USER,
          variables: { user: formState.user },
          data: {
            mockActivities: [...data.mockActivities, addActivity],
          },
        });
      }
      // Invalida o cache
      cache.evict({ fieldName: 'mockActivities' });
      cache.gc();
      
    },
    onError: (err) => {
      console.error('Mutation error:', err);
      setErrors({ form: 'Erro ao enviar os dados. Tente novamente mais tarde.' });
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const validationErrors = validateForm(formState);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    addActivity().catch((err) => {
      console.error('Error during mutation:', err);
      setErrors({ form: 'Erro ao enviar os dados. Tente novamente mais tarde.' });
    });
    setFormState({
      time: '',
      type: '',
      distance: '',
      calories: '',
      bpm: '',
      user: '',
      userImage: '',
      imageUrl: '',
    });
    setErrors({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <Layout>
      <CssBaseline />
      <form onSubmit={handleSubmit}>
        <h2>Publicar treino</h2>
        {loading && <Box display="flex" justifyContent="center"><CircularProgress /></Box>}
        {error && <Typography color="error">Erro ao enviar os dados: {error.message}</Typography>}
        {errors.form && <Typography color="error">{errors.form}</Typography>}
        <TextField
          fullWidth
          label="URL da Imagem da Atividade"
          variant="outlined"
          margin="normal"
          name="imageUrl"
          value={formState.imageUrl}
          onChange={handleChange}
          error={!!errors.imageUrl}
          helperText={errors.imageUrl}
        />
        <TextField
          fullWidth
          label="URL da Imagem do Usuário"
          variant="outlined"
          margin="normal"
          name="userImage"
          value={formState.userImage}
          onChange={handleChange}
          error={!!errors.userImage}
          helperText={errors.userImage}
        />
        <TextField
          fullWidth
          label="Distância (km)"
          variant="outlined"
          margin="normal"
          name="distance"
          value={formState.distance}
          onChange={handleChange}
          error={!!errors.distance}
          helperText={errors.distance}
        />
        <TextField
          fullWidth
          label="Calorias (kcal)"
          variant="outlined"
          margin="normal"
          name="calories"
          value={formState.calories}
          onChange={handleChange}
          error={!!errors.calories}
          helperText={errors.calories}
        />
        <TextField
          fullWidth
          label="Batimentos (BPM)"
          variant="outlined"
          margin="normal"
          name="bpm"
          value={formState.bpm}
          onChange={handleChange}
          error={!!errors.bpm}
          helperText={errors.bpm}
        />
        <TextField
          fullWidth
          label="Usuário"
          variant="outlined"
          margin="normal"
          name="user"
          value={formState.user}
          onChange={handleChange}
          error={!!errors.user}
          helperText={errors.user}
        />
        <TextField
          fullWidth
          label="Horário"
          variant="outlined"
          margin="normal"
          name="time"
          value={formState.time}
          onChange={handleChange}
          error={!!errors.time}
          helperText={errors.time}
        />
        <TextField
          fullWidth
          label="Tipo de Atividade"
          variant="outlined"
          margin="normal"
          name="type"
          value={formState.type}
          onChange={handleChange}
          error={!!errors.type}
          helperText={errors.type}
        />
        <Box display="flex" justifyContent="center" mt={2}>
          <StyledButton type="submit" variant="contained" color="primary" disabled={loading}>
            Enviar
          </StyledButton>
          <StyledButton
            type="reset"
            variant="outlined"
            color="secondary"
            onClick={() =>
              setFormState({
                time: '',
                type: '',
                distance: '',
                calories: '',
                bpm: '',
                user: '',
                userImage: '',
                imageUrl: '',
              })
            }
          >
            Limpar
          </StyledButton>
        </Box>
      </form>
    </Layout>
  );
}
