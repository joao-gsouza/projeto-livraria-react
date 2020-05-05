import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Editar from './pages/EditarPage';
import CadastroPage from './pages/CadastroPage';
import Header from './components/header/Header';
import Deletar from './pages/DeletePage';

function App() {
  return (
    <BrowserRouter>
      <Header titulo={'Projeto Livraria React'}/>
      <Switch>
        <Route path="/home">
          <HomePage/>
        </Route>
        <Route path="/cadastro">
          <CadastroPage/>
        </Route>

        <Route path="/editar/:id" children={<Editar/>}/>

        <Route path="/deletar/:id" children={<Deletar/>}/>

        <Redirect from="*" to="/home" />
      </Switch>
    </BrowserRouter>
  );
}



export default App;
