import styled from 'styled-components';

interface ContainerProps {
  positionX: string;
  positionY: string;
}

export const Container = styled.div<ContainerProps>`
  position: relative;

  span {
    background: #fff;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ececec;
    font-size: 14px;
    font-weight: 200;
    opacity: 0;
    transition: opacity 0.4s;
    position: absolute;
    color: #000;
    visibility: hidden;

    transform: translate(
      ${(props) => props.positionX},
      ${(props) => props.positionY}
    );

    &::before {
      width: 0;
      height: 0;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;

      bottom: 20px;
      position: absolute;
      left: -10%;
    }
  }
  &:hover span {
    opacity: 0.9;
    visibility: visible;
  }
`;
