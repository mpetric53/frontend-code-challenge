import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f2f2f2;
  margin: 5%;
`;

const Title = styled.h1`
  font-size: 3vw;
  font-weight: 400;
  margin-top: 10%;
  margin-bottom: 5%;
`;

const Message = styled.p`
  font-size: 2vw;
  font-weight: 300;
  margin-bottom: 10%;
`;

const ReturnButton = styled(Link)`
  padding: 2%;
  background-color: #147cc0;
  color: #fff;
  font-size: 2vw;
  text-decoration: none;
  border-radius: 5px;
  margin-bottom: 5%;
  &:hover {
    background-color: #0d8ae5;
  }
`;

const Footer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 10%;
  background-color: #fff;
  border-top: 1px solid #e5e5e5;
`;

const FooterText = styled.p`
  font-size: 2vw;
  font-weight: 300;
  margin-right: 2%;
`;

const NotFound = () => {
  return (
    <>
      <Wrapper>
        <Title>Page not found</Title>
        <Message>We're sorry, the page you requested could not be found.</Message>
        <ReturnButton to="/">Return to Home</ReturnButton>
      </Wrapper>
      <Footer>
        <FooterText>Code Challenge by Matej Petrić</FooterText>
      </Footer>
    </>
  );
};

export default NotFound;