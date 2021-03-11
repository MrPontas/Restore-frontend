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

export const Title = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  /* background-color: #000; */
  border-bottom: 1px solid #312e38;

  h1 {
    color: #000;
    padding: 20px;
    margin-right: calc(100% - 600px);
  }

  form {
    display: flex;
    flex-direction: row;
    width: 100%;
    max-width: 300px;

    button {
      border: transparent;
      background: transparent;
    }
  }
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
