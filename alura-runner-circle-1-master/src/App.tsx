import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from './styles/global';
import { Router } from './Router';
import { defaultTheme } from './styles/themes/default';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';

function App() {
  return (
    <ApolloProvider client={client}>
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
    </ApolloProvider>
  );
}


export default App;
