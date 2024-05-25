import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useAuth } from './AuthContext';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Auth = () => {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();

  const onSubmit = data => {
    login(data.username, data.password);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register('username', { required: true })} placeholder="Username" />
      <Input type="password" {...register('password', { required: true })} placeholder="Password" />
      <Button type="submit">Login</Button>
    </Form>
  );
};

export default Auth;
