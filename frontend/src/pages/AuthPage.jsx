import { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";

const AuthPage = ({ setUser }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-container">
      {isLogin ? (
        <>
          <Login setUser={setUser} />
          <p>
            Don't have an account?
            <button onClick={() => setIsLogin(false)}>Sign Up here</button>
          </p>
        </>
      ) : (
        <>
          <Signup setUser={setUser} />
          <p>
            Already have an account?
            <button onClick={() => setIsLogin(true)}>Login here</button>
          </p>
        </>
      )}
    </div>
  );
};

export default AuthPage;
