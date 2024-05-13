import  { useState } from 'react';
import "../App.css"
import "../styles/login.css"

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://your-api-endpoint.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        // Handle successful login
        console.log('Login successful!');
      } else {
        // Handle login error
        console.error('Login failed!');
      }
    } catch (error) {
      console.error('Error:', error);
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
