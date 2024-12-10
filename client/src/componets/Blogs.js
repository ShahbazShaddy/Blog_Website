import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import config from "../config";
import { CircularProgress, Box, Container, Typography, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    paddingTop: '2rem',
    paddingBottom: '2rem',
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 1rem',
  },
  header: {
    textAlign: 'center',
    marginBottom: '3rem',
    color: '#fff',
    textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
  },
  blogsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    padding: '1rem',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '50vh',
  },
  error: {
    textAlign: 'center',
    color: '#fff',
    padding: '2rem',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    backdropFilter: 'blur(10px)',
    maxWidth: '600px',
    margin: '2rem auto',
  }
}));

const Blogs = () => {
  const classes = useStyles();
  const [blogs, setBlogs] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sendRequest = async () => {
    try {
      const res = await axios.get(`${config.BASE_URL}/api/blogs`);
      if (res && res.data) {
        return res.data;
      }
      throw new Error('No data received');
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError(err.message);
      return null;
    }
  };

  useEffect(() => {
    let mounted = true;

    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const data = await sendRequest();
        if (mounted && data) {
          setBlogs(data.blogs);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchBlogs();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <Box className={classes.root}>
        <Box className={classes.loadingContainer}>
          <CircularProgress sx={{ color: '#fff' }} size={60} />
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box className={classes.root}>
        <Typography variant="h6" className={classes.error}>
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box className={classes.root}>
      <Container className={classes.container}>
        <Typography 
          variant="h3" 
          className={classes.header}
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(45deg, #fff, #f0f0f0)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '2rem'
          }}
        >
          Explore Latest Blogs
        </Typography>
        
        <Box className={classes.blogsGrid}>
          {blogs && blogs.map((blog) => (
            <Blog
              key={blog._id}
              id={blog._id}
              isUser={localStorage.getItem("userId") === blog.user._id}
              title={blog.title}
              desc={blog.desc}
              img={blog.img}
              user={blog.user.name}
              date={new Date(blog.date).toLocaleDateString()}
            />
          ))}
        </Box>
        
        {blogs?.length === 0 && (
          <Typography 
            variant="h6" 
            className={classes.error}
          >
            No blogs found. Be the first to create one!
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default Blogs;
