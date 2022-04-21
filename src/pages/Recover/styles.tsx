import { createStyles, makeStyles } from '@material-ui/core';
import styled from 'styled-components';
import signInBackground from '../../assets/background.jpeg';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  width: 100%;

  img {
    align-self: flex-end;
    max-width: 200px;
  }
`;

export const ErrorTitle = styled.h1`
  color: #1b1a1a;
  font-size: 60px;
  margin-bottom: 20px;
`;

export const ErrorMessage = styled.h1`
  color: #1b1a1a;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;

  width: 100%;
  max-width: 600px;
  align-items: center;

  div {
    img {
      max-width: 170px;
    }
  }

  form {
    margin-bottom: 20px;
    width: 340px;
    text-align: center;

    h1,
    h2,
    h3,
    h4,
    p {
      margin-bottom: 24px;
      color: #444444;
    }
  }
`;

export const useStyles = makeStyles(() =>
  createStyles({
    colorPrimary: { color: '#82af99' },
  })
);

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackground}) no-repeat center;
  background-size: cover;
  /* height: 100%; */
`;
