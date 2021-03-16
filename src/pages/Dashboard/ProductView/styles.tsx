import styled, { css } from 'styled-components';

interface StatusProps {
  inStock: boolean;
}

export const Container = styled.div`
  display: flex;
  height: auto;
  position: fixed;
  top: 70px;
  left: 178px;
  right: 0;
  bottom: 0;
  flex-direction: column;
  overflow-y: scroll;
  background-color: #fff;
  color: #000;

  form {
    padding-bottom: 40px;
    margin-left: 65px;
    width: calc(100% - 65px);
    h1,
    h2 {
      margin: 0 0 20px 20px;
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
  flex-direction: column;
  margin-bottom: 40px;

  div {
    display: flex;
    /* max-width: 600px; */
    & + div {
      margin-top: 20px;
    }

    div {
      align-self: center;
      max-width: 260px;

      margin: 0 15px 0 15px;
    }
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
  margin-top: 30px;
`;

export const Status = styled.div<StatusProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;

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
