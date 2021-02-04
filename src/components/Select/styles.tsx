import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  readOnly: boolean;
}

export const Container = styled.div`
  margin-bottom: 10px;
  flex-direction: column;
  align-items: left;
  margin: 0 !important;
  p {
    display: flex;
    margin: 0 0px 5px 35px;
    flex-direction: center;
  }
  div {
    p {
      display: flex;
      text-align: left;
      /* margin-left: 30px; */
    }
  }
  select {
    display: block;
  }
`;

export const Content = styled.div<ContainerProps>`
  display: flex;
  border-radius: 5px;

  max-height: 60px;
  align-items: flex-start;

  border: 2px solid #444444;
  background-color: #fff;

  justify-content: flex-start;

  ${(props) =>
    props.isFocused &&
    css`
      border-color: #82af99;
    `}

  select {
    ${(props) =>
      props.readOnly &&
      css`
        pointer-events: none;
      `}
    color: #232129;
    background: transparent;
    flex: 1;
    border: 0;
    padding: 16px 20px;
    margin-right: 5px;
    font-family: 'Roboto', 'sans';
    font-size: 16px;
    border: none;

    option {
      display: flex;
    }
  }
  &:focus {
    border-color: #82af99;
  }
`;
