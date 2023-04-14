import styled from 'styled-components';

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
