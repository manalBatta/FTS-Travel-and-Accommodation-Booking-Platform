import "react-app-polyfill/ie11";
import { Formik, Field, Form, FormikHelpers } from "formik";
import "../LoginPage.css";
import { LoginSchema } from "./constants";
interface Values {
  username: string;
  password: string;
  rememberUser: boolean;
}

const LoginForm = () => {
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        rememberUser: false,
      }}
      validationSchema={LoginSchema}
      onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
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
              name="password"
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
          <div className="input-field login-button">
            <button id="login-btn" type="submit">
              Login
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
