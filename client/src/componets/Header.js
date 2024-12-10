import React, { useReducer } from "react";
import { Link } from "react-router-dom";
import { authActions, setDarkmode } from "../store";
import {
  AppBar,
  Typography,
  Toolbar,
  Box,
  Button,
  Tabs,
  Tab,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useState } from "react";
import { lightTheme, darkTheme } from "../utils/theme";
import { useStyles } from "./utils";

const Header = () => {
  const dispath = useDispatch();
  const isDark = useSelector((state) => state.theme.isDarkmode);
  const theme = isDark ? darkTheme : lightTheme;
  const classes = useStyles();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [value, setValue] = useState();

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        background: isDark 
          ? 'linear-gradient(to right, #1a1a1a, #2d2d2d)'
          : 'linear-gradient(to right, #2193b0, #6dd5ed)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.15)'
      }}
    >
      <Toolbar>
        <Typography 
          variant="h4" 
          sx={{
            fontWeight: 700,
            color: '#fff',
            textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
          }}
        >
          BlogSphere
        </Typography>
        {isLoggedIn && (
          <Box display="flex" marginLeft={"auto"} marginRight="auto">
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(e, val) => setValue(val)}
              sx={{
                '& .MuiTab-root': {
                  color: '#fff',
                  opacity: 0.7,
                  '&.Mui-selected': {
                    opacity: 1
                  }
                }
              }}
            >
              <Tab
                className={isDark ? classes.darkFont : classes.font}
                LinkComponent={Link}
                to="/blogs"
                label="All Blogs"
              />
              <Tab
                className={isDark ? classes.darkFont : classes.font}
                LinkComponent={Link}
                to="/myBlogs"
                label="My Blogs"
              />
              <Tab
                className={isDark ? classes.darkFont : classes.font}
                LinkComponent={Link}
                to="/blogs/add"
                label="Add Blog"
              />
            </Tabs>
          </Box>
        )}
        <Box display="flex" marginLeft="auto">
          {!isLoggedIn && (
            <>
              <Button
                LinkComponent={Link}
                to="/login"
                sx={{
                  margin: 1,
                  borderRadius: 2,
                  background: 'rgba(255,255,255,0.1)',
                  color: '#fff',
                  backdropFilter: 'blur(10px)',
                  '&:hover': {
                    background: 'rgba(255,255,255,0.2)',
                  }
                }}
              >
                Login
              </Button>
              <Button
                LinkComponent={Link}
                to="login/"
                sx={{
                  margin: 1,
                  borderRadius: 2,
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: '#fff',
                  '&:hover': {
                    background: 'rgba(255,255,255,0.1)',
                  }
                }}
              >
                SignUp
              </Button>
            </>
          )}

          {isLoggedIn && (
            <Button
              onClick={() => dispath(authActions.logout())}
              LinkComponent={Link}
              to="/login"
              sx={{
                margin: 1,
                borderRadius: 2,
                background: 'rgba(255,255,255,0.1)',
                color: '#fff',
                '&:hover': {
                  background: 'rgba(255,255,255,0.2)',
                }
              }}
            >
              Logout
            </Button>
          )}
          <IconButton
            onClick={(e) => {
              e.preventDefault();
              dispath(setDarkmode(!isDark));
            }}
            sx={{
              color: '#fff',
              opacity: 0.7,
              '&:hover': {
                opacity: 1
              }
            }}
          >
            {isDark ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
