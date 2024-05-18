import { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import "../App.css"
import "../styles/login.css"
import { useNavigate } from "react-router-dom"

function SignupForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_ROUTE}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: firstName + " " + lastName, email: email, password: password }),
      });
      if (response.ok) {
        toast.success('Signup successful!');
        navigate("/signin")
        
      } else {
        toast.error('Signup failed!');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Signup failed!');
    }
  };

  return (
    <div className="container">
      <Toaster/>
      <h2 className='header txt-primary ft-primary'>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="firstName"
            name="firstName"
            className='ft-sec-reg fields'
            placeholder='First Name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            id="lastName"
            name="lastName"
            className='ft-sec-reg fields'
            placeholder='Last Name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            id="email"
            name="email"
            className='ft-sec-reg fields'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            name="password"
            className='ft-sec-reg fields'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <button onClick={handleSubmit}  className='btn'>Signup</button>
        </div>
      </form>
      <div className="create-account-link ft-sec-reg txt-ternary" >
        <p><a className="link" href="/signin">Already have an account? Login</a></p>
      </div>
    </div>
  );
}

export default SignupForm;
