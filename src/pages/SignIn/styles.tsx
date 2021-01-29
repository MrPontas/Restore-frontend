import styled from 'styled-components';
import { shade } from 'polished';
import signInBackground from '../../assets/background.jpeg';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;

  width: 100%;
  max-width: 600px;
  align-items: center;

  div {
    display: flex;
    color: #000;
    align-self: center;
    #logo {
      font-size: 50px;
    }
  }

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
      color: #444444;
    }

    button {
      background-color: #82af99;
      border-radius: 5px;
      border: 0;
      padding: 16px;
      margin-top: 30px;
      width: 100%;
      color: #312e38;
      font-weight: 500;
      transition: background-color 0.2s;

      &:hover {
        background: ${shade(0.2, '#82af99')};
      }
    }
  }
`;
export const Credits = styled.p`
  display: flex;
  position: absolute;
  padding: 0 0 0 10px;
  margin: 0;
  color: #8b8b8b;
  top: calc(100% - 25px);
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackground}) no-repeat center;
  background-size: cover;
`;
