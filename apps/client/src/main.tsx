import { Global, css } from '@emotion/react'
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

import { ProvideAuth } from '@hr-acuity/ui/auth';

import { App } from './app';
import { getUser, login, logout } from './utils';

const styles = css`
  *,
  ::after,
  ::before {
    box-sizing: border-box;
  }

  html,
  body {
    height: 100%;
    margin: 0;
  }
`;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <Global styles={styles} />
    <ProvideAuth login={login} logout={logout} getUser={getUser}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ProvideAuth>
  </StrictMode>
);
