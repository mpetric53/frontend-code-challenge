import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  background-color: #f5f5f5;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20%;
`;

const Input = styled.input`
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  width: 100%;
  border-radius: 5px;
  border: none;
  background-color: #fff;
  font-size: 16px;
`;

const Button = styled.button`
  background-color: #2196F3;
  color: #fff;
  padding: 14px 20px;
  border-radius: 5px;
  border: none;
  width: 100%;
  margin: 8px 0;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0d8bf2;
  }
`;

const Result = styled.p`
  margin-top: 10px;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
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

const Encoder = () => {
  const [inputString, setInputString] = useState('');
  const [encodedString, setEncodedString] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const ENDPOINT = 'http://localhost:8000/encode';

  const handleEncode = async () => {
    if(inputString !== ''){
      setErrorMessage('Please give a string to encode')
    }
    try {
      const response = await axios.post(
        ENDPOINT,
        { inputString },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      );
      setEncodedString(response.data);
      console.log(encodedString)
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
    <Wrapper>
      <FormWrapper>
        <Input
          placeholder="Input string"
          value={inputString}
          onChange={(event) => setInputString(event.target.value)}
        />
        <Button onClick={handleEncode}>Encode</Button>
        {encodedString ? <Result>Encoded string: {encodedString}</Result> : null}
        {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
      </FormWrapper>
    </Wrapper>
    <Footer>
    <FooterText>Code Challenge by Matej Petrić</FooterText>
  </Footer>
  </>
  );
};

export default Encoder;