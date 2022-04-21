import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  margin-left: 200px;
  margin-top: 70px;
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
    margin-right: auto;
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

export const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;
  button {
    display: flex;
    margin: 0 40px 0 80px;
    align-items: center;
    svg {
      margin-right: 10px;
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
