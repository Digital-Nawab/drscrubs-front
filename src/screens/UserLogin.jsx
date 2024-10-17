import React from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Login.css';
function UserLogin() {

  return (
    <>
    <Navbar/>
    
    <section className='loginregister-container'>
                    <div className={`container-login ${isSignUpMode ? 'sign-up-mode' : ''}`}>
                        <div className="forms-container">
                            <div className="signin-signup">
                               <form onSubmit={handleSubmit} className="sign-in-form">
                                    <h2 className="title">Sign in</h2>
                                    <div className="input-field">
                                        <i className="fas fa-user" />
                                        <input
                                             placeholder="Email Address"
                                             name="email"
                                             type="email"
                                             className='form-control'
                                             value={email}
                                             onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="input-field">
                                        <i className="fas fa-lock" />
                                        <input 
                                            type='password'
                                            value={password}
                                            className='form-control'
                                            name="password"
                                            onChange={handleInputChange}
                                            placeholder="Password" 
                                        />
                                    </div>
                                    <div class="checkbox-container">
                                        <input
                                             className="checkbox"
                                             id="check1"
                                             type="checkbox"
                                             name="rememberMe"
                                             checked={rememberMe}
                                             onChange={handleInputChange}
                                        />
                                        <label class="label" htmlFor="check1">Remember me</label>
                                    </div>
                                    <a href="/forget-password" className="account__login--forgot mt-5">
                                        Forget Your Password?
                                    </a>
                                    <input type="submit" defaultValue="Login" className="btn-primary" style={{width: '100px'}}/>
                                    <p className="social-text">Or Sign in with social platforms</p>
                                    <div className="social-media">
                                        <a href="#" className="social-icon">
                                        <i className="fab fa-facebook-f" />
                                        </a>
                                        <a href="#" className="social-icon">
                                        <i className="fab fa-twitter" />
                                        </a>
                                        <a href="#" className="social-icon">
                                        <i className="fab fa-google" />
                                        </a>
                                        <a href="#" className="social-icon">
                                        <i className="fab fa-linkedin-in" />
                                        </a>
                                    </div>
                                </form>
                                 <form onSubmit={handleSignupSubmit} className="sign-up-form">
                                    <h2 className="title">Sign up</h2>
                                    <div className="input-field">
                                        <i className="fas fa-user" />
                                        <input type="text"  
                                            name="first_name"
                                            value={formData.first_name}
                                            onChange={handleInputChange} 
                                            placeholder="Full Name"
                                        />
                                        {formData.errors.first_name && (
                                           <p className="error">{formData.errors.first_name}</p>
                                        )}
                                    </div>
                                    {/* <PhoneInput
                                        className=""
                                        country={'in'}        // Set initial country (optional)
                                        value={phoneNumber}         // Set initial phone number (optional)
                                        onChange={(value, country) => handleInputChange({ target: { name: 'phoneNumber', value } }, country)}// Handle phone number change
                                        />
                                        {formData.errors.phoneNumber && (
                                        <p className="error">{formData.errors.phoneNumber}</p>
                                        )} */}
                                    
                                        <div className="input-field">
                                            <i className="fas fa-envelope" />
                                            <input  type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="Email"
                                            />
                                            {formData.errors.email && (
                                            <span className="error">{formData.errors.email}</span>
                                            )}
                                        </div>
                                        <div className="input-field">
                                            <i className="fas fa-phone" />
                                            {/* <input type="text"
                                                name="phoneNumber"
                                                value={formData.phoneNumber}
                                                onChange={handleInputChange}
                                                placeholder="Phone Number"
                                            />
                                            {formData.errors.phoneNumber && (
                                                <span className="error">{formData.errors.phoneNumber}</span>
                                            )} */}
                                            <PhoneInput
                                                className=""
                                                country={'in'}        
                                                value={formData.phoneNumber}       
                                                onChange={(value, country) => handleInputChange({ target: { name: 'phoneNumber', value } }, country)}// Handle phone number change
                                                />
                                                {formData.errors.phoneNumber && (
                                                <p className="error">{formData.errors.phoneNumber}</p>
                                            )}
                                        </div>
                                        <div className="input-field">
                                            <i className="fas fa-lock" />
                                            <input 
                                                type={passwordVisible ? 'text' : 'password'}
                                                value={formData.password}
                                                name="password"
                                                onChange={handleInputChange}
                                                placeholder="Password" 
                                            />
                                            <span className="showPassword" onClick={handleTogglePassword}>  {passwordVisible ? <img src="/assets/img/eye.svg" alt="" srcset="" /> : <img src="/assets/img/eyeclosed.svg" />}</span>
                                            {formData.errors.password && (
                                               <span className="error">{formData.errors.password}</span>
                                            )}
                                        </div>
                                        <div className="input-field">
                                            <i className="fas fa-lock" />
                                            <input 
                                                type={confirmPassword ? 'text' : 'password'}
                                                value={formData.confirmPassword}
                                                name="confirmPassword"
                                                onChange={handleInputChange}
                                                placeholder="Confirm Password" 
                                            />
                                            <span className="showPassword" onClick={handleToggleConfirmPassword}>  {confirmPassword ? <img src="/assets/img/eye.svg" alt="" srcset="" /> : <img src="/assets/img/eyeclosed.svg" />}</span>
                                            {formData.errors.confirmPassword && (
                                               <span className="error">{formData.errors.confirmPassword}</span>
                                            )} 
                                        </div>
                                        <div className="account__login--remember position__relative">
                                            <input className=''
                                                type="checkbox"
                                                name="termsAccepted"
                                                checked={formData.termsAccepted}
                                                onChange={handleInputChange}
                                            />
                                            <label
                                                className="checkout__checkbox--label login__remember--label"
                                                htmlFor="check2"
                                            >
                                                I have read and agree to the terms &amp;
                                                conditions
                                            </label>
                                        </div>
                                        {formData.errors.termsAccepted && (
                                           <span className="error">{formData.errors.termsAccepted}</span>
                                        )}
                                    <input type="submit" className="btn-primary" defaultValue="Sign up" style={{width: '100px'}} />
                                </form>
                            </div>
                        </div>
                        <div className="panels-container">
                            <div className="panel-login left-panel">
                                <div className="content-box">
                                <button className="btn transparent" id="sign-up-btn" onClick={handleSignUpClick}>
                                Are You New User
                                </button>
                                </div>
                                <img
                                src="https://i.ibb.co/6HXL6q1/Privacy-policy-rafiki.png"
                                className="image"
                                alt=""
                                />
                            </div>
                            <div className="panel-login right-panel">
                                <div className="content-box">
                                <button className="btn transparent" id="sign-in-btn" onClick={handleSignInClick}>
                                Are You returning Customer
                                </button>
                                </div>
                                <img
                                src="https://i.ibb.co/nP8H853/Mobile-login-rafiki.png"
                                className="image"
                                alt=""
                                />
                            </div>
                        </div>
                    </div>
                </section>
    <Footer/>
    </>
  )
}

export default UserLogin