import { useState, FormEvent, ChangeEvent } from "react";
import { supabase } from "../supabase-client";
import "./auth.css";

export const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    if (isSignUp) {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (signUpError) {
        setError(signUpError.message);
        return;
      }
      // Show success message for email verification
      setSuccessMessage("Please check your email and click the verification link to complete your signup.");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) {
        setError(signInError.message);
        return;
      }
    }
  };
  return (
    <div className="auth-container">
      <div className="auth-form-container">        <h2 className="auth-title">
          {isSignUp ? "Signup Form" : "Login Form"}
        </h2>
        {/* Tab Switcher */}        <div className="tab-switcher">          <button
            type="button"            onClick={() => {
              setIsSignUp(false);
              setEmail("");
              setPassword("");
              setConfirmPassword("");
              setError("");
              setSuccessMessage("");
            }}
            className={`tab-button login ${!isSignUp ? 'active' : ''}`}
          >
            Login
          </button>          <button
            type="button"
            onClick={() => {
              setIsSignUp(true);
              setEmail("");
              setPassword("");
              setConfirmPassword("");
              setError("");
              setSuccessMessage("");
            }}
            className={`tab-button signup ${isSignUp ? 'active' : ''}`}
          >
            Signup
          </button>
        </div>
        <form onSubmit={handleSubmit}>          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            className="auth-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            className="auth-input"
            required
          />          {isSignUp && (
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
              className="auth-input"
              required
            />
          )}          {!isSignUp && (
            <div className="forgot-password">
              <a href="#" className="forgot-password-link">
                Forgot password?
              </a>
            </div>
          )}   
           {/* {!isSignUp && (
            <div className="forgot-password">
              <a href="#" className="forgot-password-link">
                Forgot password?
              </a>
            </div>
          )}      */}          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          {successMessage && (
            <div className="success-message">
              {successMessage}
            </div>
          )}<button
            type="submit"
            className={`submit-button ${!isSignUp ? 'login' : ''}`}
          >
            {isSignUp ? "Signup" : "Login"}
          </button>
        </form>        {/* Bottom links */}        {!isSignUp && (
          <div className="signup-prompt">
            Not a member?{" "}
            <span 
              className="signup-link"
              onClick={() => {
                setIsSignUp(true);
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setError("");
              }}
            >
              Signup now
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
