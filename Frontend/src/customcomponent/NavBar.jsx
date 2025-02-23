import { Button } from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import { Container, NavbarBrand, Navbar, Nav } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import AppContext from '../context/AppContext'
import { showToast } from './ToastComponent'

export default function NavBar() {

  const {login,setLogin} = useContext(AppContext);

  useEffect(()=>{

    if(localStorage.getItem('token') != null)
      setLogin(true);
    else 
      setLogin(false);

  },[login]);

  const navigate = useNavigate();

  const showLogin = ()=>{
    navigate('/login');
  }

  const logout = ()=>{
    localStorage.clear('token');
    showToast('Logout Successfully','success');
    setLogin(false);
    navigate('/home');
  }

  return (
    <Navbar className="bg-body-tertiary" fixed='top' expand='lg'>
        <Container fluid>
        <Navbar.Brand as={Link} to={'/home'}>
        <img
              alt=""
              src="/logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            DermaSense
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
           
          <Nav
            className="me-auto"
          >
            <Nav.Link as={Link} to={'/home'}>Home</Nav.Link>
            <Nav.Link as={Link} to={'/skinHealth'}>Skin Health</Nav.Link>
            <Nav.Link as={Link} to={'/aboutUs'}>About Us</Nav.Link>

          </Nav>
          {
            login ?
            (
              <div className='ms-auto'>
              <Button variant={'surface'} rounded={5} colorPalette={'red'} onClick={logout}>Logout</Button>
            </div>
            ):
            (
            <div className='ms-auto'>
              <Button variant={'surface'} rounded={5} colorPalette={'green'} onClick={showLogin}>Login</Button>
            </div>
            )
          }
        </Navbar.Collapse>

        </Container>
      </Navbar>
  )
}
