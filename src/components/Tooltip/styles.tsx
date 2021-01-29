import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    /* width: 160px; */
    background: #c74444;
    padding: 10px;
    border-radius: 5px;
    font-size: 14px;
    font-weight: 700;
    opacity: 0;
    transition: opacity 0.4s;
    position: absolute;
    bottom: -100%;
    left: 270%;
    color: #ffffff;
    visibility: hidden;

    &::before {
      content: '';
      /* border-style: solid;
      border-color: #c74444 transparent;
      border-width: 6px 0px 6px 6px; */
      width: 0;
      height: 0;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;

      border-right: 10px solid #c74444;
      bottom: 20px;
      position: absolute;
      left: -10%;
      /* top: 100%;
      
      transform: translateX(-50%); */
    }
  }
  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
