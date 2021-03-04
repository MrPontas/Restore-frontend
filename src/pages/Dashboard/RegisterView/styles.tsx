import { shade } from 'polished';
import styled from 'styled-components';
import Button from '../../../components/Button';

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

export const InfoDiv = styled.div`
  padding-bottom: 40px;
  margin-left: 65px;
  width: calc(100% - 65px);
  flex-direction: row;
  /* margin-bottom: 50px; */
  h1 {
    display: flex;
    margin: 0 0 20px 20px;
  }
  div {
    display: flex;
    margin-left: 20px;
    h3 {
      color: #444444;
      margin-top: 5px;
      margin-left: 10px;
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
  align-items: center;
`;

export const Status = styled.div`
  display: flex;
  width: 100%;
  margin-top: 30px;

  span {
    margin-top: 10px;
  }
`;
export const ButtonExclude = styled(Button)`
  display: flex;
  place-content: center;
  color: white;
  background-color: #c74444;
  width: 90px;
  padding: 10px 0px;
  margin-right: 50px;
  svg {
    margin-right: 5px;
  }
  &:hover {
    background: ${shade(0.2, '#c74444')};
  }
`;
