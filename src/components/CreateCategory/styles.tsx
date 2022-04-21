import styled, { css } from 'styled-components';

interface TextareaProps {
  isFocused?: boolean;
}
export const Textarea = styled.div<TextareaProps>`
  p {
    display: block;
    margin: 0 0 5px 18px;
    flex-direction: center;
  }
  div {
    display: flex;
    height: 100px;

    border: 2px solid #444444;
    border-radius: 5px;
    padding: 16px;
    textarea {
      border: transparent;
      flex: 1;
      resize: none;
      color: #232129;
      text-align: justify;
    }

    ${(props) =>
      props.isFocused &&
      css`
        border-color: #82af99;
      `}
  }
`;
