import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_MOCK_ACTIVITIES = gql`
  query GetMockActivities($user: String!) {
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

const user = "user123";

type Activity = {
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

export const CacheFirstExample: React.FC = () => {
  const { loading, error, data } = useQuery<{ mockActivities: Activity[] }>(GET_MOCK_ACTIVITIES, {
    variables: { user },
    fetchPolicy: 'cache-first',
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Cache First</h2>
      {data?.mockActivities.map((item: Activity) => (
        <p key={item.id}>{item.type}</p>
      ))}
    </div>
  );
};

export const NetworkOnlyExample: React.FC = () => {
  const { loading, error, data } = useQuery<{ mockActivities: Activity[] }>(GET_MOCK_ACTIVITIES, {
    variables: { user },
    fetchPolicy: 'network-only',
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Network Only</h2>
      {data?.mockActivities.map((item: Activity) => (
        <p key={item.id}>{item.type}</p>
      ))}
    </div>
  );
};