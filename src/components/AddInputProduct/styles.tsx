import styled from 'styled-components';
import { shade } from 'polished';

import Tooltip from '../Tooltip';

export const Container = styled.div`
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
    #cancelButton {
      background-color: #b6b6b6;
      &:hover {
        background-color: ${shade(0.2, '#b6b6b6')};
      }
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
