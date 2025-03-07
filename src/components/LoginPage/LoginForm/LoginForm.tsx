import "react-app-polyfill/ie11";
import { Formik, Field, FormikHelpers, Form } from "formik";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import "./loginButton.css";
import { LoginValidationSchema } from "./constants";
import { login, readFromReader } from "../../../services/APIs";
import { User } from "../../../Types";

const LoginForm = () => {
  let navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={LoginValidationSchema}
      onSubmit={async (user: User, { setSubmitting }: FormikHelpers<User>) => {
        setSubmitting(true);
        try {
          const response = await login(user);
          if (response?.ok) {
            const result: string | undefined = await readFromReader(
              response.clone()
            );
            if (!result) {
              throw new Error("The response body is undefined or empty.");
            }
            localStorage.setItem("auth", result);

            if (user.username === "admin") {
              navigate("/adminManagement", { replace: true });
            } else navigate("/", { replace: true });
          }
        } catch (error) {
          window.alert("Login failed:" + error);
        }
        setSubmitting(false);
      }}
    >
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
              name="password"
              type="password"
              placeholder="Enter your password"
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
              className="hvr-sweep-to-right hvr-grow"
            >
              Login
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
