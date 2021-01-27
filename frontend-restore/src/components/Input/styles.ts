import styled from 'styled-components';

export const Container = styled.div`
  border-radius: 5px;
  border: 2px solid #232129;
  color: #232129;
  padding: 16px;
  width: 100%;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }

  input {
    background: transparent;
    flex: 1;
    border: 0;
  }

  svg {
    margin-right: 16px;
  }
`;
