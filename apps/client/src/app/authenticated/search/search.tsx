import { Icon, IconButton, InputAdornment, TextField, useTheme } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useDebounce } from 'usehooks-ts'

import { MessagesContext } from '../messages';

export function Search() {
  const theme = useTheme();
  const { state, dispatch } = useContext(MessagesContext);
  const [query, setQuery] = useState<string>('');
  const debounced = useDebounce<string>(query, 400);

  useEffect(() => {
    dispatch({ type: 'filter', payload: debounced.toLowerCase() });
  }, [dispatch, debounced]);

  function clearInput() {
    setQuery('');
  }

  return (
    <TextField
      color={theme.palette.mode === 'light' ? 'secondary' : 'primary'}
      aria-label="Search"
      placeholder="Search"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Icon>search</Icon>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            {
              query && (
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={clearInput}
                  edge="end"
                >
                  <Icon>clear</Icon>
                </IconButton>
              )
            }
          </InputAdornment>
        )
      }}
      disabled={state.loading || !state.messages.length}
      variant="standard"
      sx={{ mr: 1, width: '12rem' }}
      value={query}
      onChange={e => setQuery(e.target.value)}
    />
  );
}
