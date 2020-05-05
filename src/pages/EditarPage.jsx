import * as React from "react";
import { string } from "prop-types";
import { useParams, Redirect } from "react-router-dom";
import axios from "axios";

const formEditar = {
    margin: "70px",
    height: "100px",
    width: "300px"

}


function Editar() {

    let { id } = useParams();
  
    return (<EditarPage id={id}></EditarPage>);

}



class EditarPage extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            livro: [],
            toHome: false,
            nome: '',
            preco: ''
        }

        this.submitForm = this.submitForm.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.resetarForm = this.resetarForm.bind(this);
        
    }

    componentDidMount(){

        axios
            .get(`http://localhost:8080/livro/${this.props.id}`)
            .then(resp => {
                this.setState({
                    livro: resp.data,
                    nome: resp.data.nome,
                    preco: resp.data.preco
                })
            })
            .catch(() => {
                console.log("Errrrou")
            })

    }

    submitForm(event){

        event.preventDefault();

        const livro = {
            codigo: this.state.livro.codigo,
            paginas: this.state.livro.paginas,
            nome: this.state.nome,
            preco: this.state.preco,
            categoria: this.state.livro.categoria
        }

        axios
            .put(`http://localhost:8080/livro/${this.props.id}`, livro)
            .then(resp => {
                this.setState({
                    toHome: true
                })
            })
            .catch(() => {
                console.log("Errouuuuu")
            })

    }

    onChangeInput(event){
        const novoValor = event.target.value;
        const atributo = event.target.name;

        this.setState({
            [atributo] : novoValor
        })
    }

    resetarForm(){
        this.setState({
            nome: this.state.livro.nome,
            preco: this.state.livro.preco
        })
    }

    render(){

        if(this.state.toHome){
            return (<Redirect to="/home"/>);
        }

        return(
            <>
                <div style={formEditar}>
                    <form onSubmit={this.submitForm}>

                        <div className="form-group">
                            <label>
                                Nome:
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="nome"
                                    value={this.state.nome}
                                    onChange={this.onChangeInput}
                                    required={true}
                                />
                            </label>
                            
                        </div>
                        
                        <div className="form-group">
                            <label>
                                Preço:
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    name="preco"
                                    value={this.state.preco}
                                    onChange={this.onChangeInput}
                                    required={true}
                                />
                            </label>
                        </div>

                        <button type="submit" className="btn btn-primary btn-lg mr-3">Editar</button>
                        <button type="button" className="btn btn-info btn-lg mr-3" onClick={this.resetarForm}>Resetar</button>
                    </form>
                </div>
            </>
        );
    }
}

EditarPage.propTypes = {
    id: string.isRequired
}

export default Editar;