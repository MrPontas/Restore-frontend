import styled from 'styled-components';
import Button from '../../../components/Button';

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
