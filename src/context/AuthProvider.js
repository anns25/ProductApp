import { useContext, createContext, useState } from "react";
import { toast } from "react-toastify";


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return (window.localStorage.getItem('username') || null);
  });

  const [fakeUser, setFakeUser] = useState([{
    username: "admin",
    password: "123"
  },
  {
    username: "user1",
    password: "1234"
  }]);

  const [error, setError] = useState("");

  const login = (username, password) => {
    const validUser = fakeUser.find(u => u.username === username && u.password === password);
    if (validUser) {
      setUser(validUser.username);
      window.localStorage.setItem("username", validUser.username);
      toast.success("Valid User. Welcome Back.");
      setError("")
    }
    else
      setError("Invalid Username or Password");
  }

  const signUp = (username, password) => {
    if (username && password) {
      setFakeUser(prevUsers => [...prevUsers, { username, password }]);
      setUser(username);
      window.localStorage.setItem("username", username);
      toast.success("New User created !");
      setError("");
    }
    else {
      setError("Enter Username and Password");
    }

  }

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem("username");
  }

  return <AuthContext.Provider value={{ login, signUp, logout, user, error }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};