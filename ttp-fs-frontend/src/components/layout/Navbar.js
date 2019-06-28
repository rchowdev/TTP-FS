import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Menu, Button, Responsive, Sidebar } from 'semantic-ui-react';
import { deleteSession } from '../../axios_requests/backendRequests';

const Navbar = ({ user, activeNavItem, setActiveNavItem, handleLogout, history, match }) => {
  const [visible, setVisible] = useState(false);

  const handleItemClick = (e, { name }) => {
    setVisible(false);
    setActiveNavItem(name);
  };

  const handleLogoutClick = () => {
    deleteSession()
      .then(res => {
        handleLogout();
        history.push("/");
      })
      .catch(err => console.log(err))
  };

  const renderRightMenuItems = () => {
    return (
      <Responsive as={React.Fragment} {...Responsive.onlyComputer}>
        <Menu.Item name="portfolio" active={activeNavItem === "portfolio"} onClick={handleItemClick}>
          My Portfolio
        </Menu.Item>
        <Menu.Item name="transactions" active={activeNavItem === "transactions"} onClick={handleItemClick}>
          My Transactions
        </Menu.Item>
        <Menu.Item name="log-out">
          <Button inverted onClick={handleLogoutClick}>Log Out</Button>
        </Menu.Item>
      </Responsive>
    );
  };

  const renderSideBar = () => {
    return (
      <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            onHide={e => setVisible(false)}
            vertical
            direction="right"
            visible={visible}
            width='thin'
          >
            <Menu.Item as={Button} icon="bars" color="black" onClick={e => setVisible(!visible)}></Menu.Item>
            <Menu.Item name="portfolio" active={activeNavItem === "portfolio"} onClick={handleItemClick}>
              My Portfolio
            </Menu.Item>
            <Menu.Item name="transactions" active={activeNavItem === "transactions"} onClick={handleItemClick}>
              My Transactions
            </Menu.Item>
            <Menu.Item name="log-out">
              <Button inverted onClick={handleLogoutClick}>Log Out</Button>
            </Menu.Item>
          </Sidebar>
    );
  };

  const renderNavItems = () => {
    return (
      user.email
        ? (<React.Fragment>
            {renderRightMenuItems()}
            <Responsive as={Button} icon="bars" color="black" maxWidth={769} onClick={e => setVisible(!visible)}></Responsive>
            {renderSideBar()}
          </React.Fragment>)
        : (<React.Fragment>
            <Menu.Item>
              <Button inverted color="green" name="log-in" onClick={handleItemClick}>Log In</Button>
            </Menu.Item>
            <Menu.Item>
              <Button inverted name="sign-up" onClick={handleItemClick}>Sign Up</Button>
            </Menu.Item>
          </React.Fragment>)
    );
  };

  return (
        <Menu borderless={!user.email} inverted>
          {
            user.email
              ? (<Menu.Menu position="left">
                  <Responsive as={Menu.Item} header minWidth={1000}>
                    {`Welcome, ${user.first_name}!`}
                  </Responsive>
                  <Menu.Item header active color="green">
                    {`Balance: ${user.formatted_balance}`}
                  </Menu.Item>
                </Menu.Menu>)
              : null
          }
          <Menu.Menu position="right">
            {renderNavItems()}
          </Menu.Menu>
        </Menu>
    );
};

export default withRouter(Navbar);
