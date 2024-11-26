import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginPage.css'; // Custom styles for Login Page
import { getrecruiterToken, recruitersignUp, storeToken } from './api/loginHandler'; // Import API functions

function LoginPage() {
  const [errorMessage, setErrorMessage] = useState(''); // Error handling state
  const [successMessage, setSuccessMessage] = useState(''); // Success message state

  const handleLogin = async (username, password) => {
    setErrorMessage('');
    setSuccessMessage('');
    try {
      const response = await getrecruiterToken({ username, password }); // Call login API
      console.log("response", response);
      storeToken(response); // Store token and user data in localStorage
      setSuccessMessage('Login successful!'); // Set success message
      setTimeout(() => {
        window.location.href = '/main'; // Redirect to dashboard or home
      }, 500);
    } catch (error) {
      setErrorMessage('Invalid login credentials. Please try again.');
    }
  };

  const handleSignup = async (name, username, password) => {
    setErrorMessage('');
    setSuccessMessage('');
    try {
      await recruitersignUp({ fullName: name, username, password }); // Call signup API
      setSuccessMessage('Signup successful! You can now log in.');
      setTimeout(() => {
        window.location.href = '/main';
      }, 500);
    } catch (error) {
      setErrorMessage('Signup failed. Please try again.');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        {/* Error or Success Messages */}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}

        {/* Tabs for Login and Signup */}
        <Tabs defaultActiveKey="login" id="auth-tabs" className="mb-3">
          {/* Login Tab */}
          <Tab eventKey="login" title="Login">
            <form>
              <div className="form-group my-4">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="login-username"
                  placeholder="Enter username"
                  required
                />
              </div>
              <div className="form-group my-4">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="login-password"
                  placeholder="Enter password"
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100"
                onClick={(e) => {
                  e.preventDefault();
                  const username = document.getElementById('login-username').value;
                  const password = document.getElementById('login-password').value;
                  handleLogin(username, password);
                }}
              >
                Login
              </button>
            </form>
          </Tab>

          {/* Signup Tab */}
          <Tab eventKey="signup" title="Signup">
            <form>
              <div className="form-group my-4">
                <label>Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="signup-fullname"
                  placeholder="Full name"
                  required
                />
              </div>
              <div className="form-group my-4">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="signup-username"
                  placeholder="Enter username"
                  required
                />
              </div>
              <div className="form-group my-4">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="signup-password"
                  placeholder="Enter password"
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100"
                onClick={(e) => {
                  e.preventDefault();
                  const name = document.getElementById('signup-fullname').value;
                  const username = document.getElementById('signup-username').value;
                  const password = document.getElementById('signup-password').value;
                  handleSignup(name, username, password);
                }}
              >
                Sign Up
              </button>
            </form>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default LoginPage;
