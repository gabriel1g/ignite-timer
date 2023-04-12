import styled from 'styled-components';

export const HomeContainer = styled.main`
  height: 27rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`;

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

export const CountdownContainer = styled.div`
  color: ${({ theme }) => theme['gray-100']};
  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  line-height: 8rem;
  display: flex;
  gap: 1rem;

  span:not(.separator) {
    padding: 2rem 1rem;
    border-radius: 8px;
    background-color: ${({ theme }) => theme['gray-700']};
  }

  .separator {
    width: 4rem;
    color: ${({ theme }) => theme['green-500']};
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const CountdownButton = styled.button`
  width: 100%;
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme['green-500']};
  color: ${({ theme }) => theme['gray-100']};
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme['green-700']};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
