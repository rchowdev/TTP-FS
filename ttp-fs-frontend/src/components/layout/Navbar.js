import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';

const Navbar = ({ activeNavItem, setActiveNavItem }) => {
  const handleItemClick = (e, { name }) => {
    setActiveNavItem(name);
  };

  return (
      <Menu>
        <Menu.Menu position='right'>
          <Menu.Item name='log-in' active={activeNavItem === 'log-in'} onClick={handleItemClick}>
            Log In
          </Menu.Item>
          <Menu.Item name='sign-up' active={activeNavItem === 'sign-up'} onClick={handleItemClick}>
            Sign Up
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
}

export default Navbar;
