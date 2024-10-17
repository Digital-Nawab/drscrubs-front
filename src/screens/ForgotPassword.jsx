import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from "axios";
import BassURl from '../Api/Api';
import styles from './login.module.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');


  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError(true);
      return;
    }
    try {
      const response = await axios.post(`${BassURl}/forgot-password`, { email });
      console.log(response.data.code);
      setSuccessMsg(response.data.msg);
      setError(false); 
    } catch (error) {
      setSuccessMsg('Error: Unable to sent password reset link');
      console.error('Error:', error);
    }
  };

  
  return (
    <>
      <Navbar/>

      <section className={styles['forget-section']}>
        <div className="container">
          <div className="login-register">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-3"></div>
              <div className="col-12 col-sm-12 col-md-6">
                <div className="inner h-100">
                  <form method="post" onSubmit={handleSubmit} className="customer-form">
                    <h3 className="text-center mb-3">Forgot Password</h3>
                    <p className="text-center mb-4">
                      Please enter your email address below. You will receive a link to
                      reset your password.
                    </p>
                    <div className="form-row">
                      <div className="form-group col-md-12 mb-4">
                        <label htmlFor="CustomerEmail" className="d-none">
                          Enter your email <span className="required">*</span>
                        </label>
                        <input
                          type="email"
                          placeholder="Enter your email"
                          name="email"
                          value={email}
                          onBlur={(e) => validateEmail(e.target.value)}
                          onChange={(e) => setEmail(e.target.value)}
                          required=""
                        />
                      </div>
                      <div className="form-group col-12 mb-0">
                        <div className="login-remember-forgot d-flex justify-content-between align-items-center">
                          <button type="submit" className={`${styles.btn} ${styles['btn-primary']}`}>
                            Password Reset
                          </button>
                          
                          <a
                            href="/login"
                            className="d-flex-justify-center btn-link"
                          >
                            <i className="icon anm anm-angle-left-r me-2" /> Back to
                            Login
                          </a>
                        </div>
                      </div>
                      {error && <p style={{ color: 'red' }}>Invalid email address</p>}
                      {successMsg && <p className="success-message">{successMsg}</p>}
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-3"></div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
}

export default ForgotPassword;
