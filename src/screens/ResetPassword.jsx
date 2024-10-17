import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from "axios";
import BassURl from '../Api/Api';
import styles from './login.module.css';
import { useParams } from "react-router-dom";

function ResetPassword() {
  const { token, id } = useParams();
  console.log(token);
  console.log(id);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('pending');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    // Perform token verification
    const verifyToken = async () => {
      try {
        const response = await axios.post(`${BassURl}/verify-token`, { 
          token,
          id 
        });
        console.log(response.data.code);

        if (response.data.code === 200) {
          setVerificationStatus('verified');
        } else {
          setVerificationStatus('invalid');
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        setVerificationStatus('error');
      }
    };

    verifyToken();
  }, [token,id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation checks
    if (!newPassword || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    
    try {
      // Send a request to reset the password
      const resetResponse = await axios.post(`${BassURl}/reset-password`, {
        id,
        token,
        newPassword,
        confirmPassword,
      });

      console.log(resetResponse.data.code);

      if (resetResponse.data.code === 200) {
        setSuccess(true);
      } else {
        setError(resetResponse.data.message || 'Something went wrong.');
      }
    } catch (error) {
      setError('Something went wrong. Please try again later.');
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
                {verificationStatus === 'pending' && <p>Verifying token...</p>}
                {verificationStatus === 'verified' && ( 
                <div className="inner h-100">
                {success ? (
                  <>
                    <p>
                      Password reset successfully. You can now log in with your new password.
                    </p>
                     <a href="/login" className={`${styles.btn} ${styles['btn-primary']}`}>log in</a>
                  </>
                ) : (
                    <form method="post" onSubmit={handleSubmit} className="customer-form">
                    {error && <div className="error">{error}</div>}
                    <h3 className="text-center mb-5">Reset Password</h3>
                    <div className="form-row">
                        <div className="form-group col-md-12 mb-4">
                            <label htmlFor="CustomerEmail" className="d-none">
                                Enter New Password <span className="required">*</span>
                            </label>
                            <input
                                type="password"
                                id="newPassword"
                                placeholder="Enter New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-group col-md-12 mb-4">
                            <label htmlFor="CustomerEmail" className="d-none">
                             Enter Confirm Password <span className="required">*</span>
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                placeholder="Enter Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-group col-12 mb-0">
                        <div className="login-remember-forgot d-flex justify-content-between align-items-center">
                            <button type="submit" className={`${styles.btn} ${styles['btn-primary']}`}>
                              Reset Password 
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
                       
                    </div>
                    </form>
                )}
                </div>
                )}
                {verificationStatus === 'invalid' && <p>Invalid token.</p>}
                {verificationStatus === 'error' && <p>Error verifying token.</p>}
                </div>
                <div className="col-12 col-sm-12 col-md-3"></div>
            </div>
            </div>
        </div>
        </section>
        <Footer/>
     
     </>
  ) 
}

export default ResetPassword;