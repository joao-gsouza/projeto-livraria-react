import * as React from "react";
import axios from "axios";
import { Link, Redirect } from 'react-router-dom';

class HomePage extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            livros: [],
            toHome: false
        }

    };

    componentDidMount(){
        axios
        .get('http://localhost:8080/livro')
        .then(resp =>{
            this.setState({
                livros: resp.data
            })
        })
        .catch(() =>{
            console.log('Erroou');
        })
    }

    deletarLivro(id){
        axios
            .delete(`http://localhost:8080/livro/${id}`)
            .then(() => {
                this.setState({
                    toHome: true
                })
            
            })
            .catch(() =>{
                console.log("erro ao deletar")
            })
    }

    render(){

        if(this.state.toHome){
            return (<Redirect to="/"/>);
            
        }

        const lista = this.state.livros.map(livro => {
            return(
                <tr key={livro.id}>
                    <td>
                        {livro.id}
                    </td>
                    <td>
                        {livro.nome}
                    </td>
                    <td>
                        {livro.categoria.nome}
                    </td>
                    <td>
                        {livro.preco}
                    </td>
                    <td>
                        <Link to={'/editar/'+livro.id} className="btn btn-link">Editar</Link> 
                        | 
                        <button type="button" className="btn btn-link" onClick={() => this.deletarLivro(livro.id)}>Remover</button>
                    </td>
                </tr>
            );
        })

        return(
            <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nome</th>
                <th scope="col">Categoria</th>
                <th scope="col">Preço</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
                {
                    lista
                }
            </tbody>
          </table>
        
        
        );
    }
}

export default HomePage;