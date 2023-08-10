import React from "react";
import SidebarChat from "./SidebarChat";
import classes from "./Sidebar.module.css";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, IconButton } from "@mui/material";
const Sidebar = () => {
  return (
    <div className={classes.sidebar}>
      
      <div className={classes.sidebar_header}>
        <Avatar src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"/>
        <div className={classes.sidebar_headerRight}>
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className={classes.sidebar_search}>
          <div className={classes.sidebar_searchContainer}>

            <SearchIcon />
            <input placeholder="Search or start new chat" type="text" />
          </div>
      </div>
      <div className={classes.sidebar_chats}>
        <SidebarChat className={classes.sidebar_chats}/>
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
      </div>
    </div>
  );
};

export default Sidebar;
