import * as React from "react";
import { withRouter } from "react-router-dom";
import { func, shape } from "prop-types";
import axios from "axios";

const cadastroContainer = {
    margin: "70px",
    height: "100px",
    width: "300px"
}

class CadastroPage extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            listaCategorias: [],
            codigo: '',
            paginas: '',
            nome: '',
            preco: '',
            categoria: []
        }

        this.submitForm = this.submitForm.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onChangeSelct = this.onChangeSelct.bind(this);
    }

    componentDidMount(){
        axios
            .get('http://localhost:8080/categoria')
            .then( resp => {
                this.setState({
                    listaCategorias: resp.data   
                })
            })
            .catch(erro => {
                console.log('Deu erro');
            })
    }

    submitForm(event){

        event.preventDefault();

        const listaLivros = {
            codigo: this.state.codigo,
            paginas: this.state.paginas,
            nome: this.state.nome,
            preco: this.state.preco,
            categoria: this.state.categoria
        }

        axios
        .post('http://localhost:8080/livro', listaLivros)
        .then(() => {
            this.props.history.push('/listagem');
        })

    }

    onChangeInput(event){

        const novoValor = event.target.value;
        const atributo = event.target.name;

        this.setState({
            [atributo]: novoValor
        })
        

    }

    onChangeSelct(event){

        const id = event.target.value;

        axios
        .get(`http://localhost:8080/categoria/${id}`)
        .then(resp => {
            this.setState({
                categoria: resp.data
            })
        })

    }

    render(){

        const listaCategorias = this.state.listaCategorias.map(categoria => {
            return(
                <option value={categoria.id} key={categoria.id}>{categoria.nome}</option>
            );
        })

        return(
            <div style={cadastroContainer}>
                <h1>CadastroPage</h1>
                <form onSubmit={this.submitForm}>
                    <div className="form-group">
                        <label>
                            Codigo:
                            <input 
                                name ="codigo" 
                                type="number" 
                                className="form-control"
                                value={this.state.codigo}
                                onChange={this.onChangeInput}
                                required={true}
                            />
                        </label>
                    </div>

                    <div className="form-group">
                        <label>
                            Nome:
                            <input
                                name ="nome" 
                                type="text" 
                                className="form-control"
                                value={this.state.nome}
                                onChange={this.onChangeInput}
                                required={true}
                                minLength={4}
                            />
                        </label>
                        
                    </div>

                    <div className="form-group">
                    <label>
                        Categoria:
                        <select 
                            name ="categoria" 
                            className="form-control form-control-sm"
                            onChange={this.onChangeSelct}
                            required={true}
                        >
                            <option hidden>Selecione a categoria</option>
                            {
                                listaCategorias
                            }
                        </select>
                    </label>
                    
                    </div>
                    
                    <div className="form-group">
                        <label>
                            Preço:
                            <input 
                                name="preco" 
                                type="number" 
                                className="form-control"
                                value={this.state.preco}
                                onChange={this.onChangeInput}
                                required={true}
                            />
                        </label>
                        
                    </div>

                    <div className="form-group">
                        <label>
                            Páginas:
                            <input 
                                name="paginas" 
                                type="number" 
                                className="form-control"
                                value={this.state.paginas}
                                onChange={this.onChangeInput}
                                required={true}
                            />
                        </label>
                       
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg">Cadastrar</button>
                    <button type="button" className="btn btn-primary btn-lg m-3">Limpar</button>
                </form>
            </div>
        );
    }
}

CadastroPage.propTypes = {
    history: shape({
        push: func.isRequired
    })
}

export default withRouter(CadastroPage);