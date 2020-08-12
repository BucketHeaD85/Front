import React, {Component} from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton"
import Alert from "react-bootstrap/Alert";
import Form from 'react-bootstrap/Form'
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import Modal from "react-bootstrap/Modal";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
import usuario from "../assets/user.png";
import check from "../assets/check.png";
import {trackPromise} from "react-promise-tracker";

import NavigationBar from "./NavigationBar";
import moment from 'moment';

import sillonesService from "../services/sillones.service";
import pacientesService from "../services/pacientes.service";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

registerLocale('es', es)
class SillonesList extends Component{

    constructor(props) {

        super(props);
        this.ipPaci = React.createRef();
        this.ipSill = React.createRef();
        this.state = {
            mostrarVentanaPacientes:false,
            mostrarVentanaLiberacion:false,
            salas:[],
            elegida:0,
            mostrar:false,
            radios:[],
            checked: false,
            valorRadio: -1,
            idLiberado: -1,
            startDate: new Date(),
            endDate: new Date(),
            idPaciente: -1,
            idSillon: -1,
        }
        this.tarjetaSillon = this.tarjetaSillon.bind(this);
        this.listadoSillones = this.listadoSillones.bind(this);
        this.ventanaPacientes = this.ventanaPacientes.bind(this);
        this.liberarSillon = this.liberarSillon.bind(this);
        this.handleHoraSubmit = this.handleHoraSubmit.bind(this);
        this.handlePaciente = this.handlePaciente.bind(this);
        this.handleSillon = this.handleSillon.bind(this);
        
    
    }

    handlePaciente = e =>{
        e.preventDefault();
        this.setState({idPaciente:
        this.ipPaci.current.value})
    }
    handleSillon = e =>{
        e.preventDefault();
        this.setState({idSillon:
        this.ipSill.current.value})
    }


    handleHoraSubmit(data) {
        sillonesService.createHora(data)
          .then((response) => console.log(response))
          .catch((error) => console.log(error));
      }

    handleChange = date => {
        this.setState({
          startDate: date
        });
      };

    handleChange2 = date => {
        this.setState({
        endDate: date
        });
      };

    componentDidMount() {
        this.cargarSillones()

    }

    recuperarIdPaciente(idSillon){
        sillonesService.getIdPaciente(idSillon)
    }
    cargarSillones(){
        this.setState({
            radios:[]
        })
        trackPromise(
            sillonesService.getAll().then((response) => {
                this.setState({
                    salas: response.status === 200 ? response.data : []
                });
                this.state.salas.map((sala,index) => {
                    this.setState({
                        radios: [...this.state.radios,{
                            name: "Radio",
                            valor: index+1
                        }]
                    })
                });
            })
        );
    }
    liberarSillon(){
        sillonesService.disponibilizar(this.state.idLiberado)
        sillonesService.getIdPaciente(this.state.idLiberado).then((response)=>{
            pacientesService.findPacienteById(response.data).then((paciente) =>{
                paciente.data.estado = 5
                pacientesService.modificarEstado(paciente.data)
            })
        })
        this.cargarSillones()
        this.setState({
            mostrarVentanaLiberacion:false,
            idLiberado:-1,
        })

    }

    asignarSillon(){
        pacientesService.findPacienteById(this.state.idPaciente).then((paciente) =>{
            paciente.data.estado = 5
            pacientesService.modificarEstado(paciente.data)
        })

        this.cargarSillones()
        this.setState({
            mostrarVentanaLiberacion:false,
            iidPaciente:-1,
        })

    }

    ventanaPacientes(){
        return(
            <>
                <Modal
                show={this.state.mostrarVentanaPacientes}
                onHide={ () => this.setState({
                    mostrarVentanaPacientes:false
                })}
                backdrop="static"
                keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Asignar paciente</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="asignacion">
                                <Form.Label>Identificador del paciente</Form.Label>
                                <Form.Control type="text" placeholder="RUT o DAU" onChange= {this.handlePaciente} ref={this.ipPaci} size="sm"></Form.Control>
                                {console.log(this.state.idPaciente)}
                                {console.log(this.state.idSillon)}
                                
                                
                                {console.log(moment(this.state.startDate).format("YYYY-MM-DD HH:mm:ss"))}
                                {console.log(moment(this.state.endDate).format("YYYY-MM-DD HH:mm:ss"))}
                                
                                <Form.Label>Id Sillon</Form.Label>
                                <Form.Control type="text" placeholder="Id del sillon" onChange= {this.handleSillon} ref={this.ipSill} size="sm"></Form.Control>
                                <Form.Label>Hora inicio</Form.Label>
                                <Form.Row>
                                <DatePicker
                                locale="es"
                                selected={this.state.startDate}
                                onChange={this.handleChange}
                                showTimeSelect
                                dateFormat = "Pp"
                                />
                                </Form.Row>
                                <Form.Label>Hora Termino</Form.Label>
                                <Form.Row>
                                <DatePicker
                                locale="es"
                                selected={this.state.endDate}
                                onChange={this.handleChange2}
                                showTimeSelect
                                dateFormat = "Pp"
                                />
                                
                                </Form.Row>

                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="info" onClick={ ()=> {
                            this.asignarSillon()
                            this.setState({mostrarVentanaPacientes:false});
                            this.handleHoraSubmit({
                                idPaciente: this.state.idPaciente,
                                idSillon: this.state.idSillon,
                                fInicio: moment(this.state.startDate).format("YYYY-MM-DD HH:mm:ss"),
                                fTermino: moment(this.state.endDate).format("YYYY-MM-DD HH:mm:ss")
                            });

                        }}>
                            

                        Ingresar paciente
                        </Button>
                        <Button variant="light" onClick={() => this.setState({
                            mostrarVentanaPacientes:false
                        })}>
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal
                    show={this.state.mostrarVentanaLiberacion}
                    onHide={ () => this.setState({
                        mostrarVentanaLiberacion:false
                    })}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Liberar sillón</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="asignacion">
                                <Form.Label>¿Liberar el sillón seleccionado?</Form.Label>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="info" onClick={()=>
                            this.liberarSillon()
                        }>
                            Liberar sillón
                        </Button>
                        <Button variant="light" onClick={() => this.setState({
                            mostrarVentanaLiberacion:false
                        })}>
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }

    grupoBotones(){
        return (
            <>
                <ToggleButtonGroup type="radio" name="salas">
                    {this.state.radios.map((radio, idx) => (
                        <ToggleButton
                            key={idx}
                            type="radio"
                            variant="info"
                            value={radio.valor}
                            onChange={(e) => this.setState({
                                valorRadio: e.currentTarget.value
                            })}
                            onClick={ () => this.setState({
                                mostrar: true,
                                elegida: idx+1
                            })}>
                            Ver sala {idx+1}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
            </>
        );
    }

    tarjetaSillon(sillon,idx){
        let variante = "info";
        let imagen = check;
        let variante_outline = "outline-info";
        if(sillon.ocupado === true){
            variante = "danger";
            imagen = usuario;
            variante_outline = "outline-danger";
            return(
                <Alert variant={variante} key={idx} onClose={() => this.setState(
                    {
                        mostrar: false
                    })} >
                    <Alert.Heading>
                        <p>ID sillon: {sillon.id_sillon}</p>
                        <p>ID paciente: {sillon.id_paciente}</p>
                        <div className="d-flex justify-content-end" key={idx}>
                            <img src={imagen} alt="Imagen usuario"/>
                        </div>
                    </Alert.Heading>
                    <div className="d-flex justify-content-lg-start">
                        <Button variant={variante_outline} onClick={ () => this.setState({
                            mostrarVentanaLiberacion:true,
                            idLiberado:sillon.id_sillon,
                        })}>
                            Liberar sillón
                        </Button>
                    </div>
                </Alert>
            );
        }

        return(
            <Alert variant={variante} key={idx} onClose={() => this.setState(
                {
                mostrar: false
            })} >
                <Alert.Heading>
                    <p>ID sillon: {sillon.id_sillon}</p>
                    <div className="d-flex justify-content-end" key={idx}>
                        <img src={imagen} alt="Imagen usuario"/>
                    </div>
                </Alert.Heading>
                <div className="d-flex justify-content-lg-start">
                    <Button variant={variante_outline}
                    onClick={ () => this.setState({
                        mostrarVentanaPacientes:true,
                        idSillon:sillon.id_sillon,
                    })}>
                        Asignar paciente
                    </Button>
                </div>
            </Alert>
        );

    }

    listadoSillones(listado){

        return(
            //<Container className="p-3 bg-dark" fluid>
                <Jumbotron className="justify-content-center bg-secondary">
                    <h1 className="text-light">Área de Quimioterapia</h1>
                    <h2 className="text-light">Visualización de Sillones</h2>
                    {this.grupoBotones()}
                    <Alert variant="secondary" className="mt-2" onClose={() => this.setState(
                        {
                            mostrar: false
                        })} dismissible>
                        <Alert.Heading></Alert.Heading>
                            {listado.map((sillon,index) => {
                                return (
                                    this.tarjetaSillon(sillon,index)
                                );
                            })}
                         </Alert>
                    {this.ventanaPacientes()}
                </Jumbotron>
                //{this.ventanaPacientes()}

            //</Container>
        )
    }

    render() {
        const mostrar = this.state.mostrar;
        if(mostrar){
            const salas = this.state.salas;
            return(
                salas.map((sala,index) => {
                    if(sala.id === this.state.elegida){
                        return(
                            this.listadoSillones(sala.sillones)
                        );
                    }
                })
            )
        }
        return(
            <Jumbotron className="justify-content-center bg-secondary"  >
                {/*  <Jumbotron className="pb-1 bg-secondary" fluid>*/}
                    <h1 className="text-light">Área de Quimioterapia</h1>
                    <h2 className="text-light">Visualización de Sillones</h2>
                    {this.grupoBotones()}
                {/*</Jumbotron>*/}
            </Jumbotron>
        )

    }
}



export default SillonesList;