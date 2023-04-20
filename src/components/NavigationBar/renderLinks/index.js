import React from "react";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import MobileDropdown from "../MobileDropdown";
import DesktopDropdown from "../DesktopDropdown";

const NavLink = styled(Link)({
  color: "black",
  textDecoration: "none",
  margin: "0 16px",
  "@media(max-width: 600px)": {
    margin: "16px 0",
  },
});

const Dropdown = ({ title, items, closeDrawer }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? (
    <MobileDropdown
      title={title}
      items={items}
      closeDrawer={closeDrawer}
      onClick={(e) => e.stopPropagation()}
    />
  ) : (
    <DesktopDropdown title={title} items={items} />
  );
};

const renderLinks = (dropdowns, closeDrawer) => {
  return (
    <>
      {dropdowns.map((dropdown) => {
        if (dropdown.items) {
          return (
            <Dropdown
              key={dropdown.category}
              title={dropdown.category}
              items={dropdown.items}
              closeDrawer={closeDrawer}
            />
          );
        } else {
          return (
            <NavLink
              key={dropdown.path}
              to={dropdown.path}
              sx={{
                paddingTop: "0.5rem",
              }}
              onClick={closeDrawer}
            >
              {dropdown.text}
            </NavLink>
          );
        }
      })}
    </>
  );
};

export default renderLinks;
