import LoginForm from "./LoginForm/LoginForm";
import "./LoginPage.css";
const LoginPage = () => {
  return (
    <div className="LoginContainer">
      <section className="cover-img-container">
        {/* <img src="cover.png" alt="Earth view from the space " /> */}
      </section>
      <section className="form-container">
        <header className="welcome-header">
          <h1>Welcome back!</h1>
          <h2>Enter your Credentials to access your account</h2>
        </header>
        <LoginForm></LoginForm>
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
