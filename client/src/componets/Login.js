import { Box, Button, TextField, Typography, Alert, CircularProgress } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import { InputAdornment } from '@mui/material';
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
import config from "../config";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  const sendRequest = async (type = "login") => {
    try {
      const res = await axios.post(`${config.BASE_URL}/api/users/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      return res.data;
    } catch (err) {
      throw err.response?.data?.message || "An error occurred";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await sendRequest(isSignup ? "signup" : "login");
      if (data.user) {
        localStorage.setItem("userId", data.user._id);
        dispatch(authActions.login());
        navigate("/blogs");
      }
    } catch (err) {
      setError(err.toString());
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: 2
      }}
    >
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: 4,
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            padding: 4,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.47)',
            }
          }}
        >
          <Typography 
            variant="h4" 
            textAlign="center" 
            sx={{ 
              mb: 4, 
              fontWeight: 700,
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {isSignup ? "Create Account" : "Welcome Back"}
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{width: '100%', mb: 2}}>
              {error}
            </Alert>
          )}

          {isSignup && (
            <TextField
              fullWidth
              name="name"
              onChange={handleChange}
              value={inputs.name}
              label="Name"
              margin="normal"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: '#667eea' }} />
                  </InputAdornment>
                ),
              }}
              sx={textFieldStyle}
            />
          )}
          
          <TextField
            fullWidth
            name="email"
            onChange={handleChange}
            value={inputs.email}
            type="email"
            label="Email"
            margin="normal"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: '#667eea' }} />
                </InputAdornment>
              ),
            }}
            sx={textFieldStyle}
          />
          
          <TextField
            fullWidth
            name="password"
            onChange={handleChange}
            value={inputs.password}
            type="password"
            label="Password"
            margin="normal"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: '#667eea' }} />
                </InputAdornment>
              ),
            }}
            sx={textFieldStyle}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              mt: 3,
              mb: 2,
              borderRadius: 2,
              padding: '12px',
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              textTransform: 'none',
              fontSize: '1.1rem',
              '&:hover': {
                background: 'linear-gradient(45deg, #764ba2, #667eea)',
              }
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: 'white' }} />
            ) : (
              isSignup ? "Sign Up" : "Sign In"
            )}
          </Button>

          <Button
            fullWidth
            onClick={() => setIsSignup(!isSignup)}
            sx={{
              borderRadius: 2,
              color: '#764ba2',
              textTransform: 'none',
              '&:hover': {
                background: 'rgba(118, 75, 162, 0.1)',
              }
            }}
          >
            {isSignup 
              ? "Already have an account? Sign in" 
              : "Don't have an account? Sign up"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

const textFieldStyle = {
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#667eea50',
    },
    '&:hover fieldset': {
      borderColor: '#667eea',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#764ba2',
    },
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#764ba2',
  }
};

export default Login;