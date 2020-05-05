import * as React from "react";
import "./Header.css";
import { string } from "prop-types";
import { NavLink } from 'react-router-dom';


class Header extends React.Component{
    render() {
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <span className="navbar-brand">{this.props.titulo}</span>
                <NavLink to={"/home"} activeClassName={"ativo"} className="navbar-brand" >Home</NavLink>
                <NavLink to={"/cadastro"} activeClassName={"ativo"}  className="navbar-brand">Cadastrar</NavLink>
            </nav> 
        );
    }
}

Header.propTypes = {

    titulo: string.isRequired
    
}

export default Header;