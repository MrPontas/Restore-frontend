import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  position: absolute;
  top: 70px;
  left: 202px;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProductsHeader = styled.div`
  width: 100%;
  max-height: 50px;
  height: calc(100% - 6px);
  display: flex;
  align-items: center;
  background-color: #ffffff;
  color: #000;

  h2 {
    width: 25%;
    flex-direction: column;
  }
`;
