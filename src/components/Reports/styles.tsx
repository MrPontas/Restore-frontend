import { shade } from 'polished';
import styled from 'styled-components';
import Button from '../Button';
import LabelInput from '../LabelInput';

export const CancelButton = styled(Button)`
  color: #fff;
  background-color: #b6b6b6;
  max-width: 200px;

  &:hover {
    background: ${shade(0.2, '#b6b6b6')};
  }
`;

export const ReportButton = styled(Button)`
  display: flex;
  place-items: center;
  max-width: 220px;

  svg {
    margin-right: 10px;
  }
`;

export const ReportButtonsDiv = styled.div`
  display: flex;
  flex-direction: row;
  place-content: center;

  #output_report {
    margin-left: 20px;
  }
`;

export const SearchDiv = styled.div`
  form {
    display: flex;
    flex-direction: row;
    place-content: center;
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
  }
`;

export const StyledInputLabel = styled(LabelInput)``;
