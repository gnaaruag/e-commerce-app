import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_ROUTE}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      console.log(data)
      if (response.ok) {
        // Handle successful login
        toast.success(data.message);
        console.log(response.sessionId)
        localStorage.setItem('sessionId', data.sessionId);
        localStorage.setItem('userEmail', email); // Store user emai\
        navigate("/profile")
      } else {
        // Handle login error
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2 className='header txt-primary ft-primary'>Login</h2>
      <form onSubmit={handleSubmit} >
        <div className="form-group">
          <input
            type="email"
            id="email"
            name="email"
            className='ft-sec-reg fields'
            value={email}
            placeholder='Email'
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
          <input type="submit" value="Login" className='btn'/>
        </div>
      </form>
      <div className="create-account-link ft-sec-reg txt-ternary" >
        <p><a className="link" href="/signup">Create account</a></p>
      </div>
    </div>
  );
}

export default LoginForm;
