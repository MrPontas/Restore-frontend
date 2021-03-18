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
  display: block;

  /* max-width: calc(100% - 188px); */
  width: 100%;
  max-height: 70px;
  height: 100%;
  border-bottom: 2px solid white;

  /* margin-left: 188px; */

  background-color: #82af99;

  div {
    position: absolute;
    place-content: center;
    right: 0;
    top: 0;
    margin-right: 20px;
    margin-top: 15px;
    display: column;
    p {
      font-size: 18px;
      font-weight: 600;
      /* text-decoration: wavy; */
    }
    button {
      display: flex;
      position: absolute;
      right: 0;
      margin-left: 20px;
      background-color: transparent;
      border-color: transparent;
      /* padding-bottom: 20px; */
      color: #fff;
      text-decoration: underline;

      svg {
        text-decoration: none;

        margin-right: 5px;
      }
    }
  }
`;
