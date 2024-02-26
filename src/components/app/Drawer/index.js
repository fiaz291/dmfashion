import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useRouter } from "next/router";
import PersonIcon from "@mui/icons-material/Person";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function TemporaryDrawer({ isDrawerOpen, handleDrawer }) {
  const router = useRouter();

  function getIcon(expression) {
    switch (expression) {
      case "/add-client":
        return <PersonIcon />;
      case "/add-measurement":
        return <MenuBookIcon />;
      case "/new-order":
        return <ShoppingCartIcon />;
      // code block
      default:
      // code block
    }
  }
  const list = (isDrawerOpen) => (
    <Box
      sx={{
        width: isDrawerOpen ? 250 : 60,
        overflowX: "hidden",
        "::-webkit-scrollbar": {
          display: "none",
        },
      }}
      role="presentation"
    >
      <List>
        {[
          { name: "Add Client", path: "/add-client" },
          { name: "Add Measurement", path: "/add-measurement" },
          { name: "New Order", path: "/new-order" },
        ].map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => {
                router.push(item.path);
              }}
            >
              <ListItemIcon>{getIcon(item.path)}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer
      anchor={"left"}
      variant="permanent"
      open={isDrawerOpen}
      onClose={handleDrawer}
      sx={{
        "& .MuiDrawer-paper": {
          position: "relative",
          height: "calc(100vh - 50px)",
        },
        "& .MuiDrawer-root": {
          width: !isDrawerOpen && 0,
        },
      }}
    >
      {list(isDrawerOpen)}
    </Drawer>
  );
}
