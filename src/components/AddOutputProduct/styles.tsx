import { shade } from 'polished';
import styled from 'styled-components';
import Button from '../Button';

export const ConfirmButton = styled(Button)`
  color: #fff;
  max-width: 200px;
`;
export const CancelButton = styled(Button)`
  color: #fff;
  background-color: #b6b6b6;
  max-width: 200px;

  &:hover {
    background: ${shade(0.2, '#b6b6b6')};
  }
`;
