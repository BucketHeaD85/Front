import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import routes from "./routes";
import NavigationBar from "./views/NavigationBar";
import Container from "react-bootstrap/Container";
import "./App.css";

/*
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import {Component} from "react";


function AlertVentana(){
  const [mostrar,setMostrar] = useState(false);

  if(mostrar){
    return(
        <Alert variant="info" onClose={() => setMostrar(false) } dismissible>
          <Alert.Heading>
            Witness my godhood!
          </Alert.Heading>
            <p>Work in progress</p>
        </Alert>
    );

  }
  return (
      <Button variant="info" onClick={() => setMostrar(true)}>
          Ver sillones
      </Button>
  );

}

const App = () => (
    <Container className="p-3">
        <Jumbotron className="pb-1">
            <h1>Área de Quimioterapia</h1>
            <h2>Visualización de sillones</h2>
            <AlertVentana/>
        </Jumbotron>
    </Container>
);
*/

export default () => (
    <Router basename={process.env.REACT_APP_BASENAME || ""}>
        <NavigationBar></NavigationBar>
            {routes.map((route, index) => {
                return (
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.component}
                    />
                );
            })}
    </Router>

);
