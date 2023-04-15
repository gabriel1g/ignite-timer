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

export const BaseCountdownButton = styled.button`
  width: 100%;
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 8px;
  color: ${({ theme }) => theme['gray-100']};
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const StartCountdownButton = styled(BaseCountdownButton)`
  background-color: ${({ theme }) => theme['green-500']};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme['green-700']};
  }
`;

export const StopCountdownButton = styled(BaseCountdownButton)`
  background-color: ${({ theme }) => theme['red-500']};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme['red-700']};
  }

  &:focus {
    box-shadow: 0 0 0 2px ${({ theme }) => theme['red-500']};
  }
`;
