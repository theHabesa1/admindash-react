import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import PersonIcon from "@material-ui/icons/Person";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { useNavigate } from "react-router";
import {Avatar} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "50%",
    height: "100%",
    maxWidth: 300,
    maxHeight: 300,
    backgroundColor: "#333840",
    alignItems: "left",
    paddingInline: theme.spacing(4),
    paddingTop: theme.spacing(4)
    

  },
  nested: {
    paddingLeft: theme.spacing(6),
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10px'
  },

  listText:{
    color: 'white'

  }
}));

const SideNav = () => {
  const classes = useStyles();
  const history = useNavigate();
  const [openTasks, setOpenTasks] = useState(false);
  const [openUsers, setOpenUsers] = useState(false);

  const handleClick = (path) => {
    history.push(path);
  };

  const handleClickTasks = () => {
    setOpenTasks(!openTasks);
  };

  const handleClickUsers = () => {
    setOpenUsers(!openUsers);
  };

  return (
    <div className={classes.root}>
      <div className={classes.logo}>
    
        <DashboardIcon fontSize="large" />
      </div>
      <List>
        <ListItem button onClick={handleClickTasks}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Tasks"  classes={{ primary: classes.listText }} />
          {openTasks ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openTasks} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button onClick={() => handleClick("/task-list")} className={classes.nested}>
              <ListItemText primary="Task List"  classes={{ primary: classes.listText }} />
            </ListItem>
          </List>
        </Collapse>
        <ListItem button onClick={handleClickUsers}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          

          <ListItemText primary="Users"  classes={{ primary: classes.listText }} />
          {openUsers ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openUsers} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button onClick={() => handleClick("/user-list")} className={classes.nested}>
              <ListItemText primary="User List"  classes={{ primary: classes.listText }}/>
            </ListItem>
            <ListItem button onClick={() => handleClick("/add-user")} className={classes.nested}>
            <ListItemText primary="Add User"  classes={{ primary: classes.listText }} />
            </ListItem>
          </List>
        </Collapse>
    </List>
   </div>
);
};

export default SideNav;
