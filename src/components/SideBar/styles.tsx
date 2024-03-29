import { shade } from 'polished';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  position: absolute;
  /* align-items: flex-start; */
  flex-direction: column;

  background-color: #fff;
  max-width: 200px;
  width: 100%;
  border-right: 1px solid #a8a8a8;
  padding: 0 10px 0 10px;

  header {
    background-color: #fff;
    height: 70px;
    max-width: 200px;
    width: 100%;

    div {
      display: flex;
      max-width: 180px;
      width: 100%;
      height: 70px;
      align-items: center;
      border-bottom: 2px solid #a8a8a8;

      img {
        margin: 0 auto;
        max-height: 70px;
      }
    }
  }

  div {
    border-bottom: 2px solid #a8a8a8;
    max-width: 200px;
  }
`;

export const StyledNavLink = styled(NavLink)`
  display: flex;
  position: relative;

  max-height: 50px;
  height: 100%;

  max-width: 200px;
  width: 100%;

  margin-top: 5px;
  padding: 20px;

  align-items: center;

  border-radius: 5px;
  border-color: transparent;

  color: #000;

  background-color: transparent;

  transition: background-color 0.4s;

  ${(props) =>
    props.isActive &&
    css`
      background-color: #82af99;
      color: #fff;
    `}

  &:hover {
    background: ${shade(0.2, '#d1d1d1')};
  }
  &:focus {
    background-color: #82af99;
    color: #fff;
  }
  svg {
    margin-right: 10px;
  }
`;
