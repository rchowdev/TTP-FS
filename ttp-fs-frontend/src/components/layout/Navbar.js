import React from 'react';
import { withRouter } from 'react-router-dom';
import { Menu, Button } from 'semantic-ui-react';
import axios from 'axios';

const Navbar = ({ user, activeNavItem, setActiveNavItem, handleLogout, history }) => {
  const handleItemClick = (e, { name }) => {
    setActiveNavItem(name);
  };

  const handleLogoutClick = () => {
    axios.delete("http://localhost:3001/api/v1/logout", { withCredentials: true })
      .then(res => {
        handleLogout();
        history.push('/');
      })
      .catch(err => console.log(err))
  };

  const renderNavItems = () => {
    return (
      user.email
        ? (<React.Fragment>
            <Menu.Item name='portfolio' active={activeNavItem === 'portfolio'} onClick={handleItemClick}>
              Portfolio
            </Menu.Item>
            <Menu.Item name='transactions' active={activeNavItem === 'transactions'} onClick={handleItemClick}>
              Transactions
            </Menu.Item>
            <Menu.Item name='log-out'>
              <Button secondary onClick={handleLogoutClick}>Log Out</Button>
            </Menu.Item>
          </React.Fragment>)
        : (<React.Fragment>
            <Menu.Item>
              <Button primary name='log-in' onClick={handleItemClick}>Log In</Button>
            </Menu.Item>
            <Menu.Item>
              <Button secondary name='sign-up' onClick={handleItemClick}>Sign Up</Button>
            </Menu.Item>
          </React.Fragment>)
    );
  };

  return (
      <Menu borderless={!user.email}>
        {
          user.email
            ? (<Menu.Menu position='left'>
                <Menu.Item header>
                  {`Welcome, ${user.first_name}!`}
                </Menu.Item>
              </Menu.Menu>)
            : null
        }
        <Menu.Menu position='right'>
          {renderNavItems()}
        </Menu.Menu>
      </Menu>
    );
}

export default withRouter(Navbar);
