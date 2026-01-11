import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ setUser }) => {
  const [formData, setFormData] = useState({
    name: "", email: "", password: "",
    gender: "", date_of_birth: "",
    occupation: "", phone: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
        navigate("/");
      } else {
        alert(data.message || "Check your details");
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <form onSubmit={handleSignup} className="auth-sub-form">
      <h2>Create Account</h2>
      <input name="name" placeholder="Full Name" onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      
      <select name="gender" onChange={handleChange} required>
        <option value="">Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      <input name="date_of_birth" type="date" onChange={handleChange} required />
      <input name="occupation" placeholder="Occupation" onChange={handleChange} required />
      <input name="phone" placeholder="Phone (e.g. 7800000000)" onChange={handleChange} required />
      
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;