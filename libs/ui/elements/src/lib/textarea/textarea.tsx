import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';

export const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
    width: 100%;
    font-weight: 400;
    line-height: 1.75;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? theme.palette.grey[300] : theme.palette.grey[900]};
    background: ${theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100]};
    border: 1px solid ${theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50]};

    &:hover {
      border-color: ${theme.palette.primary.main};
    }

    &:focus {
      background: ${theme.palette.mode === 'dark' ? '#000' : '#fff'};
      border-color: ${theme.palette.primary.main};
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
);
