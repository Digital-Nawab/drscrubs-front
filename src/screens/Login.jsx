import React, { useContext, useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../Redux/Action/loginAction';
import { registerUser } from "../Redux/Action/authAction";
import { Toaster } from 'react-hot-toast';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import UserLogin from './UserLogin';
import ProfileComponent from './ProfileComponent'
import  './login.css';
import styles from './Login.module.css';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2'
import MyContext from '../context/MyContext';
function Login() {

    const [isSignUpMode, setIsSignUpMode] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location)

    const handleInputChange = (e, country) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === 'checkbox' ? checked : value;

        if (isSignUpMode) {
            setFormData((prevState) => ({
                ...prevState,
                [name]: fieldValue,
                errors: {
                    ...prevState.errors,
                    [name]: '',
                },
            }));
        } else {
            if (name === 'email') setEmail(value);
            else if (name === 'password') setPassword(value);
            else if (name === 'rememberMe') setRememberMe(value);
        }
    };
    

    const handleSubmit = (event) => {
        event.preventDefault();
        const loginData = {
            email: email,
            password: password,
        };
        dispatch(loginUser(loginData, navigate, location));
    };

    const style = {    
        backgroundImage : `url("assets/img/about-us-final.jpeg")`,
        backgroundColor : '#00000082',
        backgroundBlendMode : 'overlay'
    
    }

    return (
        <>
            <Navbar />
            <div>
                <Toaster position="top-center" reverseOrder={false} />
            </div>
            <main className="main__content_wrapper">
                <section className="breadcrumb__section breadcrumb__bg" style={style}>
                    <div className="container">
                        <div className="row row-cols-1">
                        <div className="col">
                            <div className="breadcrumb__content text-center">
                            <h1 className="breadcrumb__content--title text-white mb-25">
                                Sign-In
                            </h1>
                            </div>
                        </div>
                        </div>
                    </div>
                </section>
                <section className="login-section">
                    <div className="container">
                        <div className="login-register pt-2">
                            <div className="row">
                            <div className="col-12 col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                                <div className="inner h-100">
                                <form onSubmit={handleSubmit} className="customer-form">
                                    <h3 className="text-center  mb-3">Registered Customers</h3>
                                    <p className="text-center mb-4">
                                    If you have an account with us, please log in.
                                    </p>
                                    <div className="form-row">
                                    <div className="form-group col-12">
                                        <label htmlFor="CustomerEmail" className="d-none">
                                        Email <span className="required">*</span>
                                        </label>
                                        <input
                                             placeholder="Email Address"
                                             name="email"
                                             type="email"
                                             className='form-control'
                                             value={email}
                                             onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group col-12">
                                        <label htmlFor="CustomerPassword" className="d-none">
                                        Password <span className="required">*</span>
                                        </label>
                                        <input 
                                            type='password'
                                            value={password}
                                            className='form-control'
                                            name="password"
                                            onChange={handleInputChange}
                                            placeholder="Password" 
                                        />
                                        
                                    </div>
                                    <div className="form-group col-12">
                                        <div className="login-remember-forgot d-flex justify-content-between align-items-center mb-4">
                                        <div className="remember-check customCheckbox">
                                            <input
                                                className="checkbox"
                                                id="check1"
                                                type="checkbox"
                                                name="rememberMe"
                                                checked={rememberMe}
                                                onChange={handleInputChange}
                                            />
                                            <label htmlFor="remember"> Remember me</label>
                                        </div>
                                        <a href="/forget-password">Forgot your password?</a>
                                        </div>
                                    </div>
                                    <div className="form-group col-12 mb-0">
                                        <input
                                        type="submit"
                                        className="btn btn-primary btn-lg w-100"
                                        value="Sign In"
                                        />
                                    </div>
                                    </div>
                                    <div className="login-signup-text mt-4 mb-2 text-center text-muted">
                                    Don,t have an account?{" "}
                                    <a href="/sign-up" className="btn-link">
                                        Sign up now
                                    </a>
                                    </div>
                                </form>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
          <Footer />
        </>
    )
}

export default Login