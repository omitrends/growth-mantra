import React, { useState } from 'react';
import logo from '../assets/images/rb_26614.png'; // Adjust path as necessary
import Validation from './RegisterValidation.cjs'; // Ensure this is in the correct path

const CreateAccount = () => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    dob: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Track loading state
  const [message, setMessage] = useState(''); // To store success/error message

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    // Update errors when the value changes, only validate the field changed
    setErrors(Validation({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const validationErrors = Validation(values);
    setErrors(validationErrors);
  
    // Only submit the form if there are no validation errors
    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);
        setMessage(''); // Reset message before sending request
  
        // Sending data to backend to register user
        const response = await fetch('http://localhost:5000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: values.username,
            email: values.email,
            password: values.password,
            dateOfBirth: values.dob,  // Ensure dob is included here
          }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          setMessage('Registration successful!');
          setTimeout(() => {
            window.location.href = '/dashboard'; // Redirect to Dashboard
          }, 1500);
        } else {
          setMessage(data.message || 'Something went wrong, please try again.');
        }
      } catch (error) {
        setMessage('Error occurred during registration, please try again.');
      } finally {
        setLoading(false);
      }
    }
  };
  
  

  return (
    <div>
      <div style={styles.container}>
        <div style={styles.leftPane}>
          <img src={logo} alt="Growth Mantra Logo" style={styles.logo} />
        </div>
        <div style={styles.rightPane}>
          <h2 style={styles.heading}>CREATE ACCOUNT</h2>
          <p style={styles.loginText}>
            Already have an account? <a href="/login" style={styles.loginLink}>Login</a>
          </p>
          <form style={styles.form} onSubmit={handleSubmit}>
            <div style={styles.inputContainer}>
              <input
                type="text"
                placeholder="Enter Username"
                name="username"
                value={values.username}
                onChange={handleInputChange}
                style={styles.input}
              />
              {errors.username && <span style={styles.error}>{errors.username}</span>}
            </div>
            <div style={styles.inputContainer}>
              <input
                type="email"
                placeholder="Enter Email"
                name="email"
                value={values.email}
                onChange={handleInputChange}
                style={styles.input}
              />
              {errors.email && <span style={styles.error}>{errors.email}</span>}
            </div>
            <div style={styles.inputContainer}>
              <input
                type="date"
                placeholder="Enter Date of Birth"
                name="dob"
                value={values.dob}
                onChange={handleInputChange}
                style={styles.input}
              />
              {errors.dob && <span style={styles.error}>{errors.dob}</span>}
            </div>
            <div style={styles.inputContainer}>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                value={values.password}
                onChange={handleInputChange}
                style={styles.input}
              />
              {errors.password && <span style={styles.error}>{errors.password}</span>}
            </div>
            <div style={styles.inputContainer}>
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleInputChange}
                style={styles.input}
              />
              {errors.confirmPassword && <span style={styles.error}>{errors.confirmPassword}</span>}
            </div>
            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? 'Registering...' : 'REGISTER'}
            </button>
            {message && <p style={styles.message}>{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '80vh',
    backgroundColor: '#f9f9f9',
  },
  leftPane: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    width: '500px',
  },
  rightPane: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    borderLeft: '1px solid #ddd',
    backgroundColor: 'white',
  },
  heading: {
    fontSize: '28px',
    marginBottom: '10px',
  },
  loginText: {
    fontSize: '14px',
    marginBottom: '20px',
  },
  loginLink: {
    color: '#007bff',
    textDecoration: 'none',
  },
  form: {
    width: '100%',
    maxWidth: '400px',
  },
  inputContainer: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#28a745',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  error: {
    color: '#ff4545',
    fontSize: '14px',
  },
  message: {
    color: 'green',
    fontSize: '14px',
    marginBottom: '10px',
  },
};


export default CreateAccount;