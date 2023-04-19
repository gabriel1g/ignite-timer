import styled from 'styled-components';

export const LayoutContainer = styled.div`
  height: 100%;
  padding: 2.5rem;
  border-radius: 8px;
  margin: 5rem 10rem;
  background-color: ${({ theme }) => theme['gray-800']};

  @media screen and (max-width: 1200px) {
    margin: 5rem 5rem;
  }

  @media screen and (max-width: 992px) {
    margin: 5rem 2rem;
  }

  @media screen and (max-width: 768px) {
    margin: 5rem 0rem;
  }
`;
