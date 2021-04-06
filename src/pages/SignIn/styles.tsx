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
    img {
      max-width: 250px;
    }
  }

  form {
    margin-bottom: 20px;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
      color: #444444;
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

export const LinkButton = styled.button`
  color: #444444;
  border: transparent;
  background-color: transparent;
  text-decoration: underline;
  transition: color 0.2s;
  margin-top: 20px;

  &:hover {
    color: ${shade(-0.4, '#444444')};
  }
`;
