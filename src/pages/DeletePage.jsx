import * as React from "react";
import { string } from "prop-types";
import { useParams, Redirect } from "react-router-dom";
import axios from "axios";


function Deletar() {

    let { id } = useParams();

    return (<DeletePage id={id}></DeletePage>);
  
    
}


class DeletePage extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            toHome: false
        }
    }

    deleteLivro(){
        axios
            .delete(`http://localhost:8080/livro/${this.props.id}`)
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
            return (<Redirect to="/home"/>);
            
        }else{
            this.deleteLivro();
        }


        return(
            <>
                {this.props.id}
            </>
        );
    }
}

DeletePage.propTypes ={

    id: string.isRequired

}

export default Deletar;