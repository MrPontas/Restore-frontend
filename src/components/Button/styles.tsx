import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.button`
  background-color: #82af99;
  border-radius: 5px;
  border: 0;
  padding: 16px;
  margin-top: 30px;
  width: 100%;
  color: #fff;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#82af99')};
  }
`;
