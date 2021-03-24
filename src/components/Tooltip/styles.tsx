import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    background: #c74444;
    padding: 10px;
    border-radius: 5px;
    font-size: 14px;
    font-weight: 700;
    opacity: 0;
    transition: opacity 0.4s;
    position: absolute;
    bottom: -100%;
    min-width: 100px;
    left: 270%;
    color: #ffffff;
    visibility: hidden;

    &::before {
      width: 0;
      height: 0;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;

      border-right: 10px solid #c74444;
      bottom: 20px;
      position: absolute;
      left: -10%;
    }
  }
  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
