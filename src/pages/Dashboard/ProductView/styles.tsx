import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: auto;
  position: fixed;
  top: 70px;
  left: 202px;
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

  div {
    display: flex;
    /* max-width: 600px; */
    & + div {
      margin-top: 20px;
    }

    div {
      align-self: center;

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
