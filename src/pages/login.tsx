import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "preact/hooks";
import { useNavigate } from "react-router-dom";


function Login() {
    interface FormError{
        username: string;
        password: string;
    }

    const navigate = useNavigate();


  return (
      <div className="login-container">
          <div className="login-box">
              <Formik
                  initialValues={{username: '', password: ''}}
                  validate={
                      values => {
                        //   const errors:FormError = {
                        //       username: "",
                        //       password: ""
                          //   };
                          const errors: Partial<FormError> = {};
                          if (!values.username) {
                              errors.username = "Required";
                          }
                          if (!values.password) {
                              errors.password = "Required";
                          }
                          
                          return errors;
                      }
                  }
                  onSubmit={(values, { setSubmitting }) => {
                      setTimeout(() => {
                          if (values.username === 'admin' && values.password === '789456123') {
                              alert('Login successful!');
                              navigate('/main');
                          } else {
                              alert('Unauthorized!');
                          }
                          console.log("Submitted values:", values);
                          setSubmitting(false);
                      },3000)
                  }}
              >
                  {({ isSubmitting }) => (
                      <Form className={"login-form"}>
                          <div className={"input-group"}>
                              <label htmlFor="username">Username: </label>
                              <Field type="text" name="username" id="username" />
                              <ErrorMessage name="username" component="div" className="login-error" />
                          </div>
                          <div className={"input-group"}>
                              <label htmlFor="password">Password: </label>
                              <Field type="password" name="password" id="password" />
                              <ErrorMessage name="password" component="div" className="login-error" />
                          </div>
                          <button type="submit" disabled={isSubmitting}>Login</button>
                      </Form>
                  )}
              </Formik>
          </div>
          <div className="side-box">
                <h1>Welcome to the Login Page</h1>
                <p>Please enter your credentials to access your account.</p>
              <p>If you don't have an account, please <a href="#">register</a>.</p>
          </div>
      </div>
  )
}

export default Login;