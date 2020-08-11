import React, {Component} from 'react';

import {Jumbotron} from 'react-bootstrap';

export default class Welcome extends Component {
    render() {
        return(
            <Jumbotron className="bg-dark text-white">
              <h1>Welcome!</h1>
              <p>
                Esto (Jumbotron) es parte de ./components/Welcome.js
              </p>
            </Jumbotron>
        );
    }
}