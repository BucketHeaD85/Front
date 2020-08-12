import React, {Component} from 'react';

import {Card, Table, ButtonGroup, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import axios from 'axios';


export default class PacienteList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Pacientes : []
        };
    }

    componentDidMount() {
        this.findAllPacientes();
    }
    
    findAllPacientes() {
        axios.get("https://iswayudantia02072020.herokuapp.com/pacientes")
            .then(response => response.data)
            .then((data) => {
                this.setState({Pacientes: data})
            });
    }

    deletePaciente = (pacienteId) => {
        axios.delete("https://iswayudantia02072020.herokuapp.com/pacientes/"+pacienteId)
            .then(response => {
                if(response.data != null) {
                    alert("Paciente eliminado exitosamente");
                    this.setState({
                        Pacientes: this.state.Pacientes.filter(paciente => paciente.id !== pacienteId)
                    });
                }
            });
    };


    render() {
        return (

            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faList}/> Paciente List</Card.Header>
                <Card.Body>
                    <Table bordered hover striped variant="dark">
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>ID Médico</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.Pacientes.length === 0 ? 
                            <tr align="center">
                                <td colSpan="6">No hay pacientes inscritos</td>
                            </tr> : //Else
                            this.state.Pacientes.map((Paciente) => (
                            <tr key={Paciente.id}>
                                <td>{Paciente.id}</td>
                                <td>{Paciente.idmedico}</td>
                                <td>{Paciente.estado}</td>
                                <td>
                                    <ButtonGroup>
                                        <Link to={"edit/"+Paciente.id} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Link>{' '}
                                        <Button size="sm" variant="outline-danger" onClick={this.deletePaciente.bind(this, Paciente.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                                    </ButtonGroup>
                                </td>
                            </tr>


                            ))
                        }
                    </tbody>
                    </Table>
                </Card.Body>
            </Card>
        );
    }
}