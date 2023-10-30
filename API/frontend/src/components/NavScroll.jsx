import { Container, Navbar , Nav, NavDropdown, Form, Button} from 'react-bootstrap'

import { Link } from 'react-router-dom'

const NavScroll = () => {
    return (
      <Navbar expand="lg" className="bg-primary">
      <Container>
        <Navbar.Brand href="#home">School MS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
         
            <Nav.Link href="/">Students</Nav.Link>
            <Nav.Link href="/teachers/">Teachers</Nav.Link>
            <Nav.Link href='/departments/'>Departments</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          

          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="btn btn-success">Search</Button>
          </Form>  
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}

export default NavScroll