import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import config from "../config";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./utils";

const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };
const AddBlogs = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: "",
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async () => {
    try {
      if (!inputs.title || !inputs.description || !inputs.imageURL) {
        throw new Error("All fields are required");
      }

      const response = await axios.post(`${config.BASE_URL}/api/blogs/add`, {
        title: inputs.title,
        desc: inputs.description,
        img: inputs.imageURL,
        user: localStorage.getItem("userId"),
      });

      if (response && response.data) {
        return response.data;
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      console.error("Error creating blog:", err.message);
      throw err; // Re-throw to handle in handleSubmit
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await sendRequest();
      console.log("Blog created successfully:", data);
      navigate("/blogs");
    } catch (err) {
      console.error("Failed to create blog:", err.message);
      // Here you could add user feedback, like showing an error message
    }
  };
  return (
    <Box 
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: { xs: 2, md: 4 }
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            maxWidth: 800,
            margin: 'auto',
            background: 'rgba(255, 255, 255, 0.9)',
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
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Create A New Blog
          </Typography>
          <InputLabel className={classes.font} sx={labelStyles}>
            Title
          </InputLabel>
          <TextField
            className={classes.font}
            name="title"
            onChange={handleChange}
            value={inputs.title}
            margin="auto"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          <InputLabel className={classes.font} sx={labelStyles}>
            Description
          </InputLabel>
          <TextareaAutosize
            className={classes.font}
            name="description"
            onChange={handleChange}
            minRows={10}
            margin="auto"
            variant="outlined"
            value={inputs.description}
            style={{ width: "100%", padding: "10px", fontSize: "16px", borderRadius: "4px", borderColor: "#ccc" }}
          />
          <InputLabel className={classes.font} sx={labelStyles}>
            ImageURL
          </InputLabel>
          <TextField
            className={classes.font}
            name="imageURL"
            onChange={handleChange}
            value={inputs.imageURL}
            margin="auto"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button
            sx={{ mt: 2, borderRadius: 4, padding: "10px 20px", fontSize: "16px" }}
            variant="contained"
            type="submit"
            color="primary"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddBlogs;
