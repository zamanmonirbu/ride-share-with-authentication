import React, { useContext, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../Auth/app.config';
import { userContext } from '../../../App';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUser } = useContext(userContext);

  const provider = new GoogleAuthProvider();
  const handleGoogleLogin = (event) => {
    event.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        const userDetails = result.user;
        setUser(userDetails);
        navigate(location?.state?.prevUrl);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        navigate(location?.state?.prevUrl);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  if (user) {
    // If the user is already logged in, navigate to the previous URL
    navigate(location?.state?.prevUrl);
  }

  return (
    <div className="flex flex-wrap min-h-screen w-full content-center justify-center bg-gray-200 py-10">
      <div className="flex shadow-md">
        <div className="flex flex-wrap content-center justify-center rounded-l-md bg-white" style={{ width: '24rem', height: '32rem' }}>
          <div className="w-72">
            <h1 className="text-xl font-semibold">Welcome back</h1>
            <small className="text-gray-400">Welcome back! Please enter your details</small>

            <form className="mt-4">
              <div className="mb-3">
                <label className="mb-2 block text-xs font-semibold">Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                />
              </div>

              <div className="mb-3">
                <label className="mb-2 block text-xs font-semibold">Password</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  placeholder="*****"
                  className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                />
              </div>

              <div className="mb-3 flex flex-wrap content-center">
                <Link to="/register" className="text-xs font-semibold text-purple-700">
                  Forgot password?
                </Link>
              </div>

              <div className="mb-3">
                <button onClick={handleSubmit} className="mb-1.5 block w-full text-center text-white bg-purple-700 hover-bg-purple-900 px-2 py-1.5 rounded-md">
                  Sign in
                </button>
                <button onClick={handleGoogleLogin} className="flex flex-wrap justify-center w-full border border-gray-300 hover:border-gray-500 px-2 py-1.5 rounded-md">
                  <img
                    className="w-5 mr-2"
                    src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
                    alt="Google Logo"
                  />
                  Sign in with Google
                </button>
              </div>
            </form>

            <div className="text-center">
              <span className="text-xs text-gray-400 font-semibold">Don't have an account?</span>
              <Link to="/register" className="text-xs font-semibold text-purple-700">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
