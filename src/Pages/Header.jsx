import { makeStyles } from '@material-ui/core';
import { AppBar, Toolbar, IconButton, Typography, Badge } from "@material-ui/core";
import { Notifications, AccountCircle, ExitToApp } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';

const styles = {
  appBar: {
    position: 'static'
  }
};

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#333840",
    
  },
  title: {
    flexGrow: 1,
    textTransform: "capitalize"
  },
  notificationBell: {
    color: "white"
  },
  avatar: {
    color: "white"
  },
  logout: {
    color: "white"
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    flexGrow: 1,
    textTransform: 'capitalize',
    textAlign: 'center',
    display: 'hidden',
  },
}));

function Header() {
  const classes = useStyles();
  const location = useLocation();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.logo}>
          <Typography variant="h5" >Logo</Typography>
        </div>
        <Typography variant="h6" className={classes.title}>
          {location.pathname.split("/")[1]}
        </Typography>
        <IconButton aria-label="show 17 new notifications" color="inherit">
          <Badge badgeContent={17} color="secondary">
            <Notifications className={classes.notificationBell} />
          </Badge>
        </IconButton>
        <IconButton aria-label="account of current user" color="inherit">
          <AccountCircle className={classes.avatar} />
        </IconButton>
        <IconButton aria-label="logout" color="inherit">
          <ExitToApp className={classes.logout} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(styles)(Header);
