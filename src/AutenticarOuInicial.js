import React, { Component } from 'react';
import { connect } from 'react-redux';

import RotasLogado from './RotasLogado';
import RotasDeslogado from './RotasDeslogado';


import { validateToken } from './actions/autenticacaoActions';

class AutenticarOuInicial extends Component {

    componentWillMount() {
        this.props.validateToken();
    }

    render() {
        if (this.props.usuario_firebase && this.props.valid_token) {
            return <RotasLogado />;
        }
        else if (!this.props.usuario_firebase && !this.props.valid_token) {
            return <RotasDeslogado />;
        }
        else return false;
    }
}

const mapStateToProps = state => (
    {
        usuario_firebase: state.autenticacaoReducers.usuario_firebase,
        valid_token: state.autenticacaoReducers.valid_token
    }
);

export default connect(mapStateToProps, { validateToken })(AutenticarOuInicial);
