import styled from 'styled-components';

export const Background = styled.div`
  background-color: #efeeee;
`;

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: stretch;
  overflow-y: scroll;
`;

export const Header = styled.header`
  position: absolute;
  display: flex;

  width: 100%;
  max-height: 70px;
  height: 100%;
  border-bottom: 2px solid white;

  background-color: #82af99;

  div {
    margin: 20px 20px 0px auto;
    p {
      font-size: 18px;
      font-weight: 600;
    }
    button {
      background: transparent;
      border: none;
      color: white;
      svg {
        text-decoration: none;

        margin-right: 5px;
      }
    }
  }
`;
