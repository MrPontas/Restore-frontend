import styled from 'styled-components';
import { shade } from 'polished';
import Button from '../../../components/Button';
import LabelInput from '../../../components/LabelInput';
import Select from '../../../components/Select';

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
export const ContentHeader = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 0px;
`;
export const StyledSelect = styled(Select)``;
export const SearchDiv = styled.div`
  form {
    display: flex;
    flex-direction: row;
    div:first-child {
      margin-left: 20px;
    }
    div:last-child {
      align-items: center;
    }
    div {
      margin-right: 20px;
      /* padding-left: 20px; */
      color: black;
      background-color: transparent;
    }

    button {
      margin-left: 30px;
      border: transparent;
      background-color: transparent;
    }
  }
`;

export const StyledInputLabel = styled(LabelInput)``;
export const StyledButton = styled(Button)`
  margin: 0;
  margin-top: 18px;
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

export const ButtonDiv = styled.div`
  display: flex;
  width: 100%;
  max-width: 56px;
  height: 56px;
  align-items: center;
  justify-content: flex-end;
  /* margin-bottom: 30px; */
  margin: 0;
  margin-left: auto;
  margin-right: 50px;

  button {
    vertical-align: middle;
    color: white;
    width: 160px;
  }
`;
