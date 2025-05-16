import styled, { keyframes } from "styled-components";

const toastShow = keyframes`
  0% {
    opacity: 0;
    transform: translateX(100%);
  }
  10% {
    opacity: 1;
    transform: translateX(0);
  }
  90% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(100%);
  }
`;

export const Toast = styled.div<{ type: "success" | "error" }>`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: ${({ type }) =>
    type === "success" ? "#4CAF50" : "#F44336"};
  color: white;
  padding: 16px 24px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  animation: ${toastShow} 3s forwards;
  z-index: 9999;
`;
