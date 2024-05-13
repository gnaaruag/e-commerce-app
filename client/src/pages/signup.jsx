import  { useState } from 'react';
import "../App.css"
import "../styles/login.css"

function SignupForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://your-api-endpoint.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });
      if (response.ok) {
        // Handle successful signup
        console.log('Signup successful!');
      } else {
        // Handle signup error
        console.error('Signup failed!');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
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
          <input type="submit" value="Signup" className='btn'/>
        </div>
      </form>
      <div className="create-account-link ft-sec-reg txt-ternary" >
        <p><a className="link" href="/signin">Already have an account? Login</a></p>
      </div>
    </div>
  );
}

export default SignupForm;
