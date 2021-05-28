import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface StatusProps {
  inStock: boolean;
}

export const Container = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  margin-left: 200px;
  margin-top: 70px;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  background-attachment: fixed;
  color: #000;

  form {
    padding-bottom: 40px;
    margin-left: 65px;
    width: calc(100% - 65px);
    h1,
    h2 {
      margin: 20px;
    }

    button {
      color: white;
      max-width: 100px;
      margin-left: 15px;
    }
  }
`;

export const InputForm = styled.div`
  display: flex;
  width: calc(100% - 80px);
  flex-wrap: wrap;
  min-width: 900px;
  justify-self: center;

  div {
    max-width: 260px;
    margin-right: 20px;
  }
`;

export const ButtonDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;

  button {
    color: white;
    width: 100px;
    margin-right: 50px;
  }
`;

export const StatusDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  /* margin-top: 30px; */
`;

export const Status = styled.div<StatusProps>`
  display: flex;
  flex-direction: row;
  align-items: center;

  svg {
    margin-left: 10px;
    color: #c53030;
    ${(props) =>
      props.inStock &&
      css`
        color: #82af99;
      `}
  }
  h3 {
    margin-left: 5px;
    color: #494949;
    font-weight: 100;
  }
`;

export const ButtonAdd = styled.button`
  display: flex;
  place-content: center;
  background-color: #82af99;

  width: 30px;
  height: 30px;
  border-radius: 15px;
  transition: background-color 0.2s;

  margin-top: 30px;
  svg {
    align-self: center;
  }
  &:hover {
    background-color: ${shade(-0.1, '#82af99')};
  }
`;
