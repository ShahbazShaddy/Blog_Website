/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog"; // Changed from Blogs to Blog
import { makeStyles } from "@mui/styles";
import config from "../config";
import { CircularProgress, Box, Container, Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '2rem 0',
  },
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1rem",
  },
  noBlogs: {
    textAlign: 'center',
    color: '#fff',
    marginTop: '2rem',
    padding: '2rem',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    backdropFilter: 'blur(10px)',
  }
}));

const UserBlogs = () => {
  const classes = useStyles();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const id = localStorage.getItem("userId");

  const sendRequest = async () => {
    try {
      const res = await axios.get(`${config.BASE_URL}/api/blogs/user/${id}`);
      if (res && res.data) {
        return res.data;
      }
      throw new Error('No data received');
    } catch (err) {
      console.error("Error fetching user blogs:", err);
      throw err;
    }
  };

  useEffect(() => {
    let mounted = true;

    const fetchUserBlogs = async () => {
      setLoading(true);
      try {
        const data = await sendRequest();
        if (mounted && data) {
          setUser(data.user);
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

    if (id) {
      fetchUserBlogs();
    }

    return () => {
      mounted = false;
    };
  }, [id]);

  const handleDelete = async (blogId) => {
    try {
      setLoading(true);
      await axios.delete(`${config.BASE_URL}/api/blogs/${blogId}`);
      const data = await sendRequest();
      setUser(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className={classes.root}>
      <Container className={classes.container}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress sx={{ color: '#fff' }} />
          </Box>
        ) : error ? (
          <Typography variant="h6" className={classes.noBlogs}>
            Error: {error}
          </Typography>
        ) : !user?.blogs?.length ? (
          <Typography variant="h6" className={classes.noBlogs}>
            You haven't created any blogs yet
          </Typography>
        ) : (
          user.blogs.map((blog, index) => (
            <Blog
              key={blog._id}
              id={blog._id}
              isUser={true}
              title={blog.title}
              desc={blog.desc}
              img={blog.img}
              user={user.name}
              date={new Date(blog.date).toLocaleDateString()}
            />
          ))
        )}
      </Container>
    </Box>
  );
};

export default UserBlogs;
