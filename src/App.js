import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemText,Collapse,ListItemIcon } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  BrowserRouter as Router,
  
  Route,
  Link,
  Routes 
} from "react-router-dom";

import { ExpandLess, ExpandMore, AccountCircle, Add } from "@material-ui/icons";
import SideNav from "./Pages/SideNav";
import TaskList from "./Pages/TaskList";
import NewTask from "./Pages/NewTask";
import UserList from "./Pages/UserList";
import AddUser from "./Pages/AddUser";
import Header from "./Pages/Header";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '64px',
  },

  drawer: {
    width: 240,
    flexShrink: 0,
    color : "white",
  },
  drawerPaper: {
    width: 240,
    backgroundColor: "#333840",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    width: 'calc(100% - 240px)',
    marginLeft: 240,
    overflow: 'auto'
  },
  main: {
    color: "white"
  },
  logo: {
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "#333840",
    color: "white",
    fontSize: "1.5rem",
    fontWeight: "bold"
  },
  nested: {
    paddingLeft: theme.spacing(4),
    color: 'white'
  },
  listItemText: {
    color: 'white'
  },
  sideNav: {
    paddingTop: theme.spacing(8),
  },
}));



const App = () => {
  const [tasksOpen, setTasksOpen] = useState(false);
  const [usersOpen, setUsersOpen] = useState(false);

const handleTasksClick = () => {
    setTasksOpen(!tasksOpen);
    
};

const handleUsersClick = () => {
    setUsersOpen(!usersOpen);
};

  const classes = useStyles();
  return (
    <><Header />
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.logo}>Logo</div>
        <List className={classes.sideNav}>
          <ListItem button onClick={handleTasksClick}>
            <ListItemIcon className={classes.listItemText}>
              <Add />
            </ListItemIcon>
            <ListItemText primary="Tasks" className={classes.main} />
            {tasksOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={tasksOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button component={Link} to="/tasks">
                <ListItemText primary="Task List" className={classes.nested} />
              </ListItem>
              <ListItem button component={Link} to="/add-task">
                <ListItemText primary="Add Task" className={classes.nested} />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button onClick={handleUsersClick}>
            <ListItemIcon className={classes.listItemText}>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="Users" className={classes.main} />
            {usersOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={usersOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button component={Link} to="/users">
                <ListItemText primary="User List" className={classes.nested} />
              </ListItem>
              <ListItem button component={Link} to="/add-user">
                <ListItemText primary="Add User" className={classes.nested} />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </Drawer>
      <div className={classes.content}>

        <Routes>
          <Route exact path="/" element={<SideNav />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/add-task" element={<NewTask />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/add-user" element={<AddUser />} />

        </Routes>

      </div>
    </div></>
    
    );
    };
    
    export default App;
