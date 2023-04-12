import styled from 'styled-components';

export const LayoutContainer = styled.div`
  height: 100%;
  padding: 2.5rem;
  border-radius: 8px;
  margin: 5rem 10rem;
  background-color: ${({ theme }) => theme['gray-800']};
  display: flex;
  flex-direction: column;
`;
