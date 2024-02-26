import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import styles from "./styles";
import Drawer from "@mui/material/Drawer";
import TemporaryDrawer from "../Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Face6Icon from "@mui/icons-material/Face6";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DrawerLayout({ children }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const handleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  return (
    <div className="w100 col">
      <nav className="row justify-between nav-height align-center">
        <div className="row align-center">
          <div className="clickable">
            <div className="row align-center" style={{ marginRight: 20 }}>
              <img src="/images/logo.jpg" alt="logos" width={40} height={40} />
              <div style={{ lineHeight: 0, marginLeft: 10 }}>
                {isDrawerOpen ? "DM Fashion" : ""}
              </div>
            </div>
          </div>
          <div
            className="clickable"
            onClick={handleDrawer}
            style={{ height: 24 }}
          >
            {isDrawerOpen ? <MenuOpenIcon /> : <MenuIcon />}
          </div>
        </div>
        <div className="clickable">
          <Face6Icon />
        </div>
      </nav>
      <div className="row">
        <TemporaryDrawer
          handleDrawer={handleDrawer}
          isDrawerOpen={isDrawerOpen}
        />
        <div
          style={{
            minHeight: "calc(100vh - 50px)",
            padding: 10,
          }}
          className="w100"
        >
          {children}
        </div>
      </div>
      <ToastContainer />
      <style jsx>{styles}</style>
    </div>
  );
}
