import React from 'react';

import { BrowserRouter as Router, Link } from "react-router-dom";
import { logout } from './HelperFunctions';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width : '98.5vw'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


export default function BoardHeader(props) {
  const classes = useStyles(); // Meterial UI 참조
  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: '#2E3B55' }}>
        <Toolbar>
          <IconButton onClick = {props.gotoMainPage} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <HomeIcon />
          </IconButton>
          <Typography variant="h5" className={classes.title} >
            Mozzarello
          </Typography>
          <Link to ="/MyInfo" style = {{textDecoration: "none", color : "white"}}>
            <Button edge="start" className={classes.menuButton} color="inherit" aria-label="menu" >
              내 정보
            </Button>     
          </Link>
          <Button onClick = {() => {logout(props)}} edge="start" className={classes.menuButton} color="inherit" aria-label="menu" >
            로그아웃
          </Button>             
          <p>{"환영합니다. " + props.username + " 님"}</p>
        </Toolbar>
      </AppBar>
    </div>
  );
}