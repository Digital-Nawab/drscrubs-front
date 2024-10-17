import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../Redux/Action/loginAction';

function SignupModel({ hide }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userLogin);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");
    const storedRememberMe = localStorage.getItem("rememberMe");
    
    if (storedEmail && storedPassword && storedRememberMe) {
      setEmail(storedEmail);
      setPassword(storedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, type, checked, value } = event.target;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
    else if (name === "rememberMe") setRememberMe(checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser({ email, password }, navigate, location));

    if (rememberMe) {
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      localStorage.setItem("rememberMe", true);
    } else {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      localStorage.removeItem("rememberMe");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="newsletter__popup newsletter__show"
      data-animation="slideInUp"
    >
      <div id="boxes" className="newsletter__popup--inner">
        <button
          className="newsletter__popup--close__btn"
          aria-label="close button"
          onClick={() => hide(false)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 512 512">
            <path fill="currentColor" d="M368 368L144 144M368 144L144 368" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={32} />
          </svg>
        </button>
        <div className="box newsletter__popup--box d-flex align-items-center">
          <div className="newsletter__popup--thumbnail">
            <img className="newsletter__popup--thumbnail__img display-block" src="/assets/img/login-bg.png" alt="newsletter-popup-thumb" />
          </div>
          <div className="newsletter__popup--box__right">
            <h2 className="newsletter__popup--title">Login</h2>
            <div className="newsletter__popup--content">
              <div className="newsletter__popup--subscribe" id="frm_subscribe">
                <form className="newsletter__popup--subscribe__form" onSubmit={handleSubmit}>
                  <input
                    className="account__login--input"
                    placeholder="Email Address"
                    name="email"
                    type="email"
                    value={email}
                    onChange={handleInputChange}
                  />
                  <input
                    className="account__login--input"
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={handleInputChange}
                  />
                  <div className="account__login--remember__forgot mb-15 d-flex justify-content-between align-items-center">
                    <div className="account__login--remember position__relative">
                      <input
                        className="checkout__checkbox--input"
                        id="check1"
                        type="checkbox"
                        name="rememberMe"
                        checked={rememberMe}
                        onChange={handleInputChange}
                      />
                      <span className="checkout__checkbox--checkmark" />
                      <label className="checkout__checkbox--label login__remember--label" htmlFor="check1">
                        Remember me
                      </label>
                    </div>
                    <button className="account__login--forgot" type="button">
                      Forgot Your Password?
                    </button>
                  </div>
                  <button className="newsletter__popup--subscribe__btn" type="submit">
                    Login
                  </button>
                </form>
              </div>
              <div className="account__login--divide">
                <span className="account__login--divide__text text-black">OR</span>
              </div>
              <p className="account__login--signup__text">
                Don't Have an Account? <Link to="/sign-up">Sign up now</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default SignupModel;
