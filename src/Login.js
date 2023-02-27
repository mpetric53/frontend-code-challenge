import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f5f5f5;
`

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3%;
  background-color: #fff;
  border-radius: 10px;
  width: 50%;
  max-width: 400px;
`

const InputWrapper = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 10%;
  font-weight: 400;
`

const Input = styled.input`
  margin-top: 5%;
  padding: 2%;
  border-radius: 5px;
  border: none;
`

const ErrorMessage = styled.div`
  color: red;
  margin-top: 5%;
  text-align: center;
`

const LoginButton = styled.button`
  background-color: blue;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10%;
  width: 100%;
  font-weight: 600;
  border: none;
`

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

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
    return emailRegex.test(email)
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*\d).{6,}$/;
    return passwordRegex.test(password)
  };

  const handleLogin = async () => {
    if (validateEmail() && validatePassword()) {
      try {
        const response = await axios.post('http://localhost:8000/login', {
          email: email,
          password: password,
        })

        if (response.data.token) {
          localStorage.setItem('token', response.data.token)
          navigate('/encoder')
        } else {
          setErrorMessage(response.data.message)
        }
      } catch (error) {
        setErrorMessage('Something went wrong. Please try again.')
      }
    } else {
      setErrorMessage('Invalid email or password')
    }
  }

  return (
    <>
    <Wrapper>
      <LoginWrapper>
        <InputWrapper>
          <span>Email</span>
          <Input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <span>Password</span>
          <Input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </InputWrapper>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <LoginButton onClick={handleLogin}>Login</LoginButton>
      </LoginWrapper>
      {/* <TextWrapper>code challenge by Matej Petrić</TextWrapper> */}
    </Wrapper>
    <Footer>
        <FooterText>Code Challenge by Matej Petrić</FooterText>
      </Footer>
    </>
  )
}

export default Login