import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStyles } from "./utils";
import config from "../config";
const Blogs = ({ title, desc, img, user, isUser, id }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  };
  const deleteRequest = async () => {
    const res = await axios
      .delete(`${config.BASE_URL}/api/blogs/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleDelete = () => {
    deleteRequest()
      .then(() => navigate("/"))
      .then(() => navigate("/blogs"));
  };
  return (
    <Box sx={{ mb: 4, mx: 2 }}>
      <Card
        sx={{
          width: { xs: '95%', sm: '80%', md: '60%' },
          margin: 'auto',
          padding: 2,
          borderRadius: 4,
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.3)',
          }
        }}
      >
        {isUser && (
          <Box display="flex" justifyContent="flex-end" gap={1}>
            <IconButton 
              onClick={handleEdit}
              sx={{
                bgcolor: 'rgba(255, 152, 0, 0.1)',
                '&:hover': { bgcolor: 'rgba(255, 152, 0, 0.2)' }
              }}
            >
              <ModeEditOutlineIcon color="warning" />
            </IconButton>
            <IconButton 
              onClick={handleDelete}
              sx={{
                bgcolor: 'rgba(244, 67, 54, 0.1)',
                '&:hover': { bgcolor: 'rgba(244, 67, 54, 0.2)' }
              }}
            >
              <DeleteForeverIcon color="error" />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                background: 'linear-gradient(45deg, #667eea, #764ba2)'
              }}
            >
              {user?.charAt(0)?.toUpperCase()}
            </Avatar>
          }
          title={
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {title}
            </Typography>
          }
        />
        <CardMedia component="img" height="194" image={img} alt="Paella dish" />

        <CardContent>
          <hr />
          <br />
          <Typography
            className={classes.font}
            variant="body2"
            color="text.secondary"
          >
            <b>{user}</b> {": "} {desc}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Blogs;
