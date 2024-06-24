import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

interface SignUpFormValues {
  username: string;
  password: string;
}

const SignUp: React.FC = () => {
  const initialValues: SignUpFormValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .max(15, 'Username cannot exceed 15 characters')
      .required('Username is required'),
    password: Yup.string()
      .min(4, 'Password must be at least 4 characters')
      .max(20, 'Password cannot exceed 20 characters')
      .required('Password is required'),
  });

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      const response = await axios.post('http://localhost:3001/auth', data);
      console.log('Sign up successful:', response.data);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="formContainer">
          <div>
            <label htmlFor="username">Username:</label>
            <Field
              type="text"
              id="username"
              name="username"
              placeholder="(Ex. John123...)"
            />
            <ErrorMessage name="username" component="span" />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <Field
              type="password"
              id="password"
              name="password"
              placeholder="Your Password..."
            />
            <ErrorMessage name="password" component="span" />
          </div>
          <button type="submit">Sign Up</button>
        </Form>
      </Formik>
    </div>
  );
};

export default SignUp;