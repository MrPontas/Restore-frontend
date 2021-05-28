import styled, { css } from 'styled-components';

interface ContainerProps {
  whiteBackground?: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  width: 100%;
  margin-left: 200px;
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  color: black;
  ${(props) =>
    props.whiteBackground &&
    css`
      background-color: white;
    `}
`;
