import styled from '@emotion/styled';
import { CircularProgress, AppBar, Icon, IconButton, Toolbar, Typography, Container } from '@mui/material';
import { styled as muiStyled } from '@mui/system';
import { lazy, Suspense, useReducer } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useAuth } from '@hr-acuity/ui/auth';

import { InitialMessageState, MessagesContext, MessagesReducer } from './messages';
import { Search } from './search';

const Messages = lazy(() => import('./messages'));

const ToolbarGroup = styled.div`
  align-items: center;
  display: flex;
  margin-left: auto;
`;

export const Name = muiStyled(Typography)(
  ({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      display: 'none',
    }
  })
);

const Footer = styled(AppBar)`
  bottom: 0;
  font-size: 0.75rem;
  padding: 0.25rem 0;
  text-align: center;
  top: auto;
`;

/**
 * For this actual exercise, lazy loading will actually do more harm than good because the app is way too
 * small to be worth the round-trip.
 *
 * In real life however, I'd usually lazy load each feature section of the app by default, and then lazy load
 * specific views that have heavy dependencies. So I'm going to lazy load the messages section as a nod to
 * real-life applications, even though in this exercise, the round-trip isn't worth shaving off a couple kb.
 */
export function Authenticated() {
  const [ state, dispatch ] = useReducer(MessagesReducer, InitialMessageState);
  const { user, logout } = useAuth();

  return (
    <MessagesContext.Provider value={{ state, dispatch }}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h5" component="span" sx={{ mr: 2 }}>
            [LOGO]
          </Typography>
          <Name variant="h6">
            HR Acuity Messenger
          </Name>
          {user && (
            <ToolbarGroup>
              <Search />
              <IconButton
                size="large"
                title="Logout"
                onClick={logout}
                color="inherit"
              >
                <Icon>account_circle</Icon>
              </IconButton>
            </ToolbarGroup>
          )}
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<Suspense fallback={<CircularProgress />}><Messages/></Suspense>} />
        </Routes>
      </Container>
      <Footer position="fixed" color="primary">
        &copy; 2023 Coding Interviews R Us
      </Footer>
    </MessagesContext.Provider>
  )
}
