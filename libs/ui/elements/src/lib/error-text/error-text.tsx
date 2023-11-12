import { styled } from '@mui/system';

export const ErrorText = styled('p')(
  ({ theme }) => `
    color: ${theme.palette.error.main}
  `,
);
