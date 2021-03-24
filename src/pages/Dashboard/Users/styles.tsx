import styled from 'styled-components';
import Button from '../../../components/Button';

export const Container = styled.div`
  display: flex;
  position: absolute;
  top: 70px;
  left: 178px;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  /* background-color: #000; */
  border-bottom: 1px solid #312e38;

  h1 {
    color: #000;
    padding: 20px;
    margin-right: calc(100% - 600px);
  }
`;

export const ButtonDiv = styled.div`
  display: flex;
  width: 100%;
  height: 56px;
  align-items: center;
  justify-content: flex-end;
  margin: 0;
  margin-left: auto;
  margin-right: 50px;

  button {
    display: flex;
    vertical-align: middle;
    color: white;
    width: 300px;
    svg {
      margin-right: 10px;
    }
  }
`;

export const StyledButton = styled(Button)`
  max-width: 200px;
  margin-right: 40px;
  width: 100%;
  place-content: center;
`;
