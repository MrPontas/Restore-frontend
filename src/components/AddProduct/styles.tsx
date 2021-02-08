import styled from 'styled-components';
import Tooltip from '../Tooltip';

export const Container = styled.div`
  display: flex;
  height: auto;
  position: flex;
  flex-direction: column;
  /* overflow-y: scroll; */
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

export const Status = styled.div`
  display: flex;
  width: 100%;
  margin-top: 30px;

  span {
    margin-top: 10px;
  }
`;

export const TooltipI = styled(Tooltip)`
  color: #82af99;

  height: 15px;
  width: 15px;
  margin-left: 10px;
  svg {
    margin: 0;
  }
  span {
    background-color: #82af99;
  }
`;

export const TooltipO = styled(Tooltip)`
  color: #c53030;
  height: 15px;
  width: 15px;
  margin-left: 10px;
  svg {
    margin: 0;
  }
`;
