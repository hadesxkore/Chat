import React from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    signInWithPopup(auth, provider)
      .then((result) => {
        navigate('/chat');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-4">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-2xl mb-4 text-center">Chat App Login</h2>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg w-full"
            onClick={signInWithGoogle}
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
