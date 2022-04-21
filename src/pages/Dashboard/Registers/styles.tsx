import styled from 'styled-components';
import { shade } from 'polished';
import Button from '../../../components/Button';
import LabelInput from '../../../components/LabelInput';
import Select from '../../../components/Select';

export const Container = styled.div`
  display: flex;
  width: 100%;
  margin-left: 200px;
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ContentHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 20px 0px;

  form {
    display: flex;
    flex-direction: row;
    margin-right: 200px;

    &:first-child {
      margin-left: 40px;
    }

    div {
      margin-right: 10px;
      background-color: transparent;
      p {
        color: #383838;
      }
    }
    button {
      background: transparent;
      border: transparent;
    }
  }
`;
export const StyledSelect = styled(Select)``;

export const StyledInputLabel = styled(LabelInput)`
  height: 19px;
`;
export const StyledButton = styled(Button)`
  display: flex;
  margin: 0;
  max-width: 200px;
  margin-top: 10px;
  * {
    text-decoration: none;
  }
  svg {
    margin-right: 10px;
  }
`;
export const FormButton = styled.button`
  margin: 0;
  margin-top: 18px;
  margin-left: 15px;
  color: #82af99;
  padding: 0;
  transition: color 0.2s;
  &:hover {
    color: ${shade(0.2, '#82af99')};
  }
`;
