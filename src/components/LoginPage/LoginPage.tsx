import LoginForm from "./LoginForm/LoginForm";
import "./LoginPage.css";
const LoginPage = () => {
  return (
    <div className="LoginContainer">
      <section className="cover-img-container">
        <img src="cover.png" alt="Earth view from the space " />
      </section>
      <section className="form-container">
        <LoginForm></LoginForm>
        {/* <form action="">
          <div className="input-filed">
            <label htmlFor="user-name">User name</label>
            <input type="text" placeholder="Enter your Username" required />
          </div>
          <div className="input-filed">
            <label htmlFor="password">
              Password{" "}
              <a href="#" className="forget-password-link">
                Forget password
              </a>
            </label>
            <input type="password" placeholder="password" required />
          </div>
          <div className="remember-user-checkbox">
            <input type="checkbox" placeholder="password" id="remember-user" />
            <label htmlFor="remember-user">Remember me</label>
          </div>
          <div className="input-filed login-button">
            <input type="submit" value={"Login"} />
          </div>
        </form> */}
        <div className="google-apple-container">
          <section className="login-options-container">
            <img src="google.png" alt="Google Logo " />
            <a href="#">Sign in with Google</a>
          </section>
          <section className="login-options-container">
            <img src="apple.png" alt="Apple Logo " />
            <a href="#">Sign in with Apple</a>
          </section>
        </div>
        <p style={{ textAlign: "center", width: "100%" }}>
          Don’t have an account?
          <a href="#" style={{ textDecoration: "none", color: "#0F3DDE" }}>
            Sign Up
          </a>
        </p>
      </section>
    </div>
  );
};
export default LoginPage;
