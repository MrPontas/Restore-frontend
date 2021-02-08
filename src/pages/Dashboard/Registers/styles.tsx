import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  position: absolute;
  top: 70px;
  left: 178px;
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

export const ButtonDiv = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 30px;
  button {
    vertical-align: middle;

    color: white;
    width: 160px;
    margin-right: 50px;
  }
`;
