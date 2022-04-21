import { shade } from 'polished';
import styled from 'styled-components';
import Button from '../Button';

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
