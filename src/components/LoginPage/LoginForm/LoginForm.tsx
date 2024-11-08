import "react-app-polyfill/ie11";
import { Formik, Field, Form, FormikHelpers } from "formik";
import "./LoginForm.css";
import "./loginButton.css";

import { LoginSchema } from "./constants";
import { login, User } from "../../../APIs";

const LoginForm = () => {
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={LoginSchema}
      onSubmit={(user: User, { setSubmitting }: FormikHelpers<User>) => {
        setTimeout(() => {
          login(user).then((res) => {
            if (res?.ok || true) {
              //TO DO : redirect to the home page
            }
          });

          setSubmitting(false);
        }, 500);
      }}>
      {({ errors, touched }) => (
        <Form>
          <div className="input-field">
            <label htmlFor="username">Username</label>
            <Field
              name="username"
              id="username"
              type="text"
              placeholder="Enter your Username"
              required
            />
            {errors.username && touched.username ? (
              <div className="invalid-input-error">{errors.username}</div>
            ) : null}
          </div>
          <div className="input-field">
            <label htmlFor="password">
              Password
              <a href="#" className="forget-password-link">
                Forget password
              </a>
            </label>
            <Field
              id="password"
              type="password"
              placeholder="password"
              required
            />
            {errors.password && touched.password ? (
              <div className="invalid-input-error">{errors.password}</div>
            ) : null}
          </div>
          <div className="remember-user-checkbox">
            <Field
              name="rememberUser"
              id="remember-user"
              type="checkbox"
              placeholder="password"
            />
            <label htmlFor="remember-user">Remember me</label>
          </div>
          <div className="input-field login-button ">
            <button
              id="login-btn"
              type="submit"
              className="hvr-sweep-to-right hvr-grow">
              Login
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
