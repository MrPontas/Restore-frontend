import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { Container, useStyles } from './styles';

const Loading: React.FC = () => {
  const classes = useStyles();
  return (
    <Container className={classes.load}>
      <div>
        <CircularProgress className={classes.colorPrimary} color="primary" />
      </div>
    </Container>
  );
};

export default Loading;
