import styled from 'styled-components';

export const LayoutContainer = styled.div`
  height: calc(100vh - 10rem);
  padding: 2.5rem;
  border-radius: 8px;
  margin: 5rem 10rem;
  background-color: ${({ theme }) => theme['gray-800']};
  display: flex;
  flex-direction: column;
`;
