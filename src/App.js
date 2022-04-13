
import React from 'react'
import axios from 'axios';
import styled from "styled-components"
import Header from './components/Header';
import Home from './components/Home';
import Carrinho from './components/Carrinho';

import PaginaDeProdutos from "./components/PaginaDeProdutos"
import DetalhesDoProduto from "./components/DetalhesDoProduto"
import Cadastro from './components/Cadastro';






export default class App extends React.Component {
  state = {
    // telaAtual: "home",
    telaAtual: "produtos",
    produtoId: ""
  }

  mudarTela = (nomeTela) => {
    this.setState({ telaAtual: nomeTela, produtoId: "" })
  };

  irParaHome = () => {
    this.mudarTela("home")
  };

  irParaCarrinho = () => {
    this.mudarTela("carrinho")
  };

  irParaCadastro = () => {
    this.mudarTela("cadastro")
  };

  irParaDetalhes = (id) => {
    // this.mudarTela("detalhes")
    this.setState({telaAtual: "detalhes", produtoId: id})
  };

  irParaProdutos = () => {
    this.mudarTela("produtos")
  };



  mostrarTela = () => {
    switch (this.state.telaAtual) {

      case "home":
        return <Home irParaCadastro={this.irParaCadastro} irParaProdutos={this.irParaProdutos} />;
      case "carrinho":
        return <Carrinho />;
      case "cadastro":
        return <Cadastro irParaCadastro={this.irParaCadastro} />;
      case "produtos":
        return <PaginaDeProdutos irParaProdutos={this.irParaProdutos} irParaDetalhes={this.irParaDetalhes}/>;
      case "detalhes":
        return <DetalhesDoProduto irParaProdutos={this.irParaProdutos} id={this.state.produtoId} />;
      default:
        return <Home irParaCadastro={this.irParaCadastro} irParaProdutos={this.irParaProdutos} />;
    }
  };

  render() {

    return (
      <div>
        
        <Header
          irParaCarrinho={this.irParaCarrinho}
          irParaHome={this.irParaHome}
        />

        {this.mostrarTela()}

      </div>
    )
  }
}


