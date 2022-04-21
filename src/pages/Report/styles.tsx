import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  @media print {
    #printSpan {
      display: none;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 1000px;
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 22px;

  h2 {
    margin-bottom: 15px;
  }
  h1,
  h2,
  h3,
  h4,
  p {
    color: black;
  }
  h2 + p {
    margin-bottom: 10px;
  }
`;

export const Values = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`;

export const PrintSpan = styled.span`
  position: absolute;

  margin: 30px;

  button {
    display: flex;
    padding: 8px;
    border: 2px solid #444444;
    background-color: #ffffff;
    border-radius: 5px;

    svg {
      margin-right: 8px;
    }
    &:hover {
      background-color: ${shade(0.2, '#fff')};
    }
  }
`;
