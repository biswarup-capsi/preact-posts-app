import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "preact/hooks";

function Login() {
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    
    // const handleLogin = (e:Event) => {
    //     e.preventDefault();
    //     if (username === 'admin' && password === '789456123') {
    //         // login logic...
    //         alert('Login successful!');
    //     }
    //     else {
    //         alert("Unauthorized!");
    //     }
    // }

    interface FormError{
        username: string;
        password: string;
    }

  return (
      <div className="login-container">
          <div className="login-box">
              <Formik
                  initialValues={{username: '', password: ''}}
                  validate={
                      values => {
                          const errors:FormError = {
                              username: "",
                              password: ""
                          };
                          if (!values.username) {
                              errors.username = "Required";
                          }
                          if (!values.username) {
                              errors.password = "Required";
                          }
                          return errors;
                      }
                  }
                  onSubmit={(values, { setSubmitting }) => {
                      setTimeout(() => {
                          alert(JSON.stringify(values, null, 2));
                          setSubmitting(false);
                      },1000)
                  }}
              >
                  {({ isSubmitting }) => (
                      <Form className={"login-form"}>
                          <h3>Login</h3>
                          <div className={"input-group"}>
                              <label htmlFor="username">Username: </label>
                              <Field type="text" name="username" />
                              <ErrorMessage name="username" component="div" className="login-error" />
                          </div>
                          <div className={"input-group"}>
                              <label htmlFor="password">Password: </label>
                              <Field type="password" name="password" />
                              <ErrorMessage name="password" component="div" className="login-error" />
                          </div>
                          <button type="submit" disabled={isSubmitting}>Login</button>
                      </Form>
                  )}
              </Formik>
          </div>
          <div className="side-box">
                <h2>Welcome to the Login Page</h2>
                <p>Please enter your credentials to access your account.</p>
                <p>If you don't have an account, please register.</p>
          </div>
      </div>
  )
}

export default Login;