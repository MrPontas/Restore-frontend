import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  position: absolute;
  top: 70px;
  left: 178px;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  background-color: white;
  overflow-y: scroll;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: black;
  margin: 50px 0 50px 50px;
  h2 {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 30px;
    div {
      margin-left: 10px;
    }
  }
`;

export const ButtonDiv = styled.div`
  display: flex;
  /* justify-content: flex-end; */

  button {
    display: flex;
    align-items: center;
    max-width: 190px;
    width: 100%;
    color: white;
    margin-right: 40px;
    svg {
      margin-right: 10px;
    }
  }
`;

export const ButtonOutDiv = styled.div`
  display: flex;
  /* justify-content: flex-end; */
  margin-right: 40px;
  margin-left: auto;
  button {
    display: flex;
    align-items: center;
    max-width: 190px;
    width: 100%;
    color: white;

    & + button {
      margin-left: 20px;
    }
    svg {
      margin-right: 10px;
    }
  }
  #cancel {
    width: 150px;
    background-color: #b6b6b6;
    &:hover {
      background: ${shade(0.2, '#b6b6b6')};
    }
  }
`;

export const ButtonSave = styled.div`
  display: flex;
  margin-left: 50px;

  button {
    display: flex;
    align-items: center;
    max-width: 190px;
    width: 100%;
    color: white;
    margin-right: 40px;
    svg {
      margin-right: 10px;
    }
  }
`;