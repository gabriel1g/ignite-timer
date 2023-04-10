import styled, { css } from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    height: 2.5rem;
    width: 2.5rem;
  }

  nav {
    display: flex;
    gap: 0.5rem;

    a {
      height: 3rem;
      width: 3rem;
      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;
      color: ${({ theme }) => theme['gray-100']};
      line-height: 0;
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        border-bottom-color: ${({ theme }) => theme['green-500']};
      }

      &.active {
        color: ${({ theme }) => theme['green-500']};
      }
    }
  }
`;
