import React, { FC, memo } from 'react';
import { css } from '@emotion/react';
import Button from '@mui/material/Button';

type FetchButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  label: string;
};

/**
 * Button that fetches data
 */
const FetchButton: FC<FetchButtonProps> = ({ label, onClick, disabled }) => {
  return (
    <Button variant={'outlined'} onClick={onClick} disabled={disabled}>
      {label}
    </Button>
  );
};

const styles = {
  root: css({}),
};

export default memo(FetchButton);
