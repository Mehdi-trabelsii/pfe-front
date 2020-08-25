import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import CategoryIcon from "@material-ui/icons/Category";
import DevicesIcon from "@material-ui/icons/Devices";
import GroupIcon from "@material-ui/icons/Group";
import { Link, withRouter, useHistory } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import HomeFragments from "../homefragments/homeFragments";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import CardHeader from "@material-ui/core/CardHeader";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import Imageside from "../adminAssets/sidebar-4.jpg";
import { useDidMount } from "../../hooks/useLifeCycle";
import { getUsers } from "../../requests/auth";
import TND from "../adminAssets/tnd.png"
import useApiState from "../../hooks/useApiState";
import Chart from "./chart.js";


import "../scss/admin.scss";

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

export default function ClippedDrawer() {
  const classes = useStyles();
  const [usersState, usersCall] = useApiState(getUsers);
  useDidMount(() => {
    usersCall();
  });
  return (
    <div className={classes.root}>
    
     
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >        <img src={Imageside} className="imgdash"></img>

        <div className="drawercontainer">

          <List >

            <Link to="/admin/home" className="labelhome">
              <ListItem button className="actuallabelhome">
                <ListItemIcon>
                  <HomeIcon className="labelhome"/>
                </ListItemIcon>
                <ListItemText  primary="Home" />
              </ListItem>
            </Link>
            <Link to="/admin/categories" className="labelhome">
              <ListItem button>
                <ListItemIcon>
                  <CategoryIcon className="labelhome"/>
                </ListItemIcon>
                <ListItemText primary="Categories" />
              </ListItem>
            </Link>
            <Link to="/admin/products" className="labelhome">
              <ListItem button>
                <ListItemIcon>
                  <DevicesIcon className="labelhome"/>
                </ListItemIcon>
                <ListItemText primary="Produits" />
              </ListItem>
            </Link>
            <Link to="/" className="labelhome">
              <ListItem button >
                <ListItemIcon>
                  <ShoppingCartIcon className="labelhome"/>
                </ListItemIcon>
                <ListItemText primary="Commandes" />
              </ListItem>
            </Link>
            <Link to="/" className="labelhome">
              <ListItem button className="labelhome">
                <ListItemIcon>
                  <GroupIcon className="labelhome"/>
                </ListItemIcon >
                <ListItemText primary="Users" className="labelhome"/>
              </ListItem>
            </Link>
          </List>
          <Divider />
          <List>
            {["Deconnexion"].map((text, index) => (
              <ListItem button key={text} className="labelhome" >
                <ListItemIcon>
                  <ExitToAppIcon className="labelhome"/>{" "}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <Typography>
          <Grid container spacing={3}>
            <Grid item xs>
              <Card className="cardusers">
                <CardContent className="topcard1">
                  <div>
                    <PeopleAltIcon className="headcard1" />{" "}
                  </div>
                  <div>
                    {" "}
                    <p className="userlabel1">Users</p>
                  </div>
                </CardContent>
                <CardContent className="topcard1">
                  <div>
                    <div />{" "}
                  </div>
                  <div>
                    {" "}
                    <p className="totalusers">{usersState.data?.length}</p>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs>
            <Card className="cardusers">
                <CardContent className="topcard1">
                  <div>
                    <ShoppingCartIcon className="headcard2" />{" "}
                  </div>
                  <div>
                    {" "}
                    <p className="userlabel1">Orders</p>
                  </div>
                </CardContent>
                <CardContent className="topcard1">
                  <div>
                    <div />{" "}
                  </div>
                  <div>
                    {" "}
                    <p className="totalusers">210</p>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs>
            <Card className="cardusers">
                <CardContent className="topcard1">
                  <div>
                    <img src={TND} className="headcard3" />{" "}
                  </div>
                  <div>
                    {" "}
                    <p className="userlabel1">Revenue</p>
                  </div>
                </CardContent>
                <CardContent className="topcard1">
                  <div>
                    <div />{" "}
                  </div>
                  <div>
                    {" "}
                    <p className="totalusers">25450 TND</p>
                  </div>
                </CardContent>
              </Card>            </Grid>
          </Grid>
          <Grid container spacing={3}>
            
<Grid item xs><Chart/></Grid>

</Grid>
        </Typography>
      </main>
    </div>
  );
}
