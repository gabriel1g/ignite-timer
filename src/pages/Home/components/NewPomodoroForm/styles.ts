import styled from 'styled-components';

export const FormContainer = styled.div`
  width: 100%;
  color: ${({ theme }) => theme['gray-100']};
  font-size: 1.125rem;
  font-weight: bold;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  input {
    height: 2.5rem;
    padding: 0 0.5rem;
    border: none;
    border-bottom: 2px solid ${({ theme }) => theme['gray-500']};
    background-color: transparent;
    color: ${({ theme }) => theme['gray-100']};
    font-size: inherit;
    font-weight: bold;

    &::placeholder {
      color: ${({ theme }) => theme['gray-500']};
    }

    &:focus {
      border-bottom-color: ${({ theme }) => theme['green-500']};
      box-shadow: none;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

export const TaskInput = styled.input`
  flex-grow: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`;

export const MinutesAmountInput = styled.input`
  width: 4rem;
`;
