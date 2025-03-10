import styled from 'styled-components';
import { useAuthContext } from '../contexts/AuthProvider';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errorMsgs, setErrorMsgs] = useState<string[]>([]);

  const { onLogin, isAuthenticated } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, []);

  const validateEmail = () => {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onClick = (evt: React.MouseEvent<HTMLElement, MouseEvent>) => {
    evt.preventDefault();
    setErrorMsgs([]);

    if (!validateEmail()) {
      setErrorMsgs((prev) => [...prev, 'Invalid email address']);
    }
    if (name.length < 3) {
      setErrorMsgs((prev) => [
        ...prev,
        'Username must be at least 3 characters long',
      ]);
    }

    if (!errorMsgs.length) {
      onLogin(name, email);
    }
  };

  return (
    <LoginWrapper>
      <LoginTitle>
        <LoginTitleGroup>
          <LoginTitleWord>Dogs!</LoginTitleWord>
          <LoginTitleWord>Dogs!</LoginTitleWord>
        </LoginTitleGroup>
        <LoginTitleWord>&</LoginTitleWord>
        <LoginTitleGroup>
          <LoginTitleWord>More</LoginTitleWord>
          <LoginTitleWord>Dogs!</LoginTitleWord>
        </LoginTitleGroup>
      </LoginTitle>
      <LoginInfoForm>
        <LoginInfoInput
          placeholder="Username"
          value={name}
          onInput={(evt) => setName((evt.target as HTMLInputElement).value)}
        />
        <LoginInfoInput
          type="email"
          placeholder="Email"
          value={email}
          onInput={(evt) => setEmail((evt.target as HTMLInputElement).value)}
        />
        {errorMsgs.map((msg, index) => (
          <ErrorMsg key={index}>{msg}</ErrorMsg>
        ))}
        <LoginInfoButton disabled={!name || !email} onClick={onClick}>
          Login
        </LoginInfoButton>
      </LoginInfoForm>
    </LoginWrapper>
  );
};

/////////////////////////////////////////////////////////////////////////////////////////

const LoginWrapper = styled.div`
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const LoginTitle = styled.div`
  font-weight: bold;
  color: gold;
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  font-size: 7.5vw;
  line-height: 7.5vw;

  @media (max-width: 1024px) {
    width: 80%;
    font-size: 10vw;
    line-height: 10vw;
  }
`;

const LoginTitleGroup = styled.span`
  display: flex;
  gap: 2rem;
`;

const LoginTitleWord = styled.span`
  display: inline-block;
  transform: rotate(-20deg);
  text-shadow: 1px 1px black, 2px 2px black, 3px 3px black, 4px 4px black,
    5px 5px black, 6px 6px black, 7px 7px black;
`;

const LoginInfoForm = styled.div`
  display: flex;
  gap: 15px;
  flex-direction: column;
  width: 360px;
  margin: 2rem;
  position: relative;
  background: rgb(248, 246, 240, 0.7);
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  border-radius: 15px;
`;

const LoginInfoInput = styled.input`
  outline: none;
  background: rgb(255, 255, 255, 0.7);
  width: 100%;
  border: 0;
  padding: 15px;
  box-sizing: border-box;
  border-radius: 15px;
  color: black;
`;

const LoginInfoButton = styled.button`
  text-transform: uppercase;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #ffffff;
  border-radius: 15px;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const ErrorMsg = styled.span`
  color: red;
  display: inline-block;
`;

export default Login;
