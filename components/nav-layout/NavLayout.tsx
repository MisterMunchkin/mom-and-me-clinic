'use client'

import { useState } from "react";
import NavBar from "./NavBar";
import BurgerMenu from "./BurgerMenu";
import React from "react";

export default function NavLayout() {
  const [ showDrawer, setShowDrawer ] = useState(false);

  return (
    <React.Fragment>
      <NavBar 
        setShowDrawer={setShowDrawer}
      />

      <BurgerMenu 
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
      />
    </React.Fragment>
  )
}