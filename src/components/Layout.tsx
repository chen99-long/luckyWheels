// components/Layout.tsx
import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
`;

const Main = styled.main`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container>
      <Header>
        <Title>幸运转盘抽奖</Title>
      </Header>
      <Main>{children}</Main>
    </Container>
  );
};

export default Layout;