import React, {Component} from 'react';
import {Navbar, Dropdown} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import Nav from "react-bootstrap/Nav";

export default class NavigationBar extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark" className="mb-1">
                <Link to={""} className="navbar-brand">
                    Gestor
                </Link>
                <Nav>
                <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-variants-Secondary" className="mr-1">Pabellón</Dropdown.Toggle>
                </Dropdown>
                <Dropdown>
                    <Dropdown.Toggle variant="secondary"  id="dropdown-variants-Secondary" className="mr-1">Pacientes</Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item><Link to={"add"}>Add Paciente</Link></Dropdown.Item>
                        <Dropdown.Item><Link to={"list"}>Paciente List</Link></Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                   <Nav.Link href="/sillones">Quimioterapia</Nav.Link>
                </Nav>
            </Navbar>
        );
    }

}