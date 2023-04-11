import styled from 'styled-components';

export const HistoryContainer = styled.div`
  height: 100%;
  padding: 3.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  h1 {
    color: ${({ theme }) => theme['gray-100']};
    font-size: 1.5rem;
  }
`;

export const HistoryList = styled.div`
  margin-top: 2rem;
  overflow: auto;

  &::-webkit-scrollbar {
    height: 6px;
    width: 6px;
  }

  &::-webkit-scrollbar-corner {
    display: none;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 30px;
    background-color: #505059;
  }

  table {
    width: 100%;
    min-width: 600px;
    border-collapse: collapse;

    thead th {
      padding: 1rem;
      background-color: ${({ theme }) => theme['gray-600']};
      color: ${({ theme }) => theme['gray-100']};
      font-size: 0.875rem;
      text-align: left;

      &:first-child {
        padding-left: 1.5rem;
        border-top-left-radius: 8px;
      }

      &:last-child {
        padding-right: 1.5rem;
        border-top-right-radius: 8px;
      }
    }

    tbody td {
      padding: 1rem;
      border-top: 4px solid ${({ theme }) => theme['gray-800']};
      background-color: ${({ theme }) => theme['gray-700']};
      font-size: 0.875rem;

      &:first-child {
        width: 50%;
        padding-left: 1.5rem;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }
`;
