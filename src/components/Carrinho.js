import React from "react";
import axios from "axios";
import styled from "styled-components";
import Home from "./Home";
import Carrinho from "./Carrinho";

const CardServico = styled.div`
  border: 1px solid black;
  display: flex;
  background-color: grey;
  justify-content: space-between;
`;

export default class Header extends React.Component {
  calcularTotal = () => {
    const totalValor = this.props.carrinho.reduce((total, servico) => {
      return total + servico.price;
    }, 0);
    return totalValor;
  };

  mostrarLista = () => {
    return this.props.carrinho.map((servico, index) => (
      <CardServico key={servico.id}>
        <h3>{servico.title}</h3>
        <p>
          Preço:{" "}
          {servico.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
        <button onClick={() => this.props.removerDoCarrinho(index)}>
          Remover
        </button>
      </CardServico>
    ));
  };

  render() {
    const total = this.calcularTotal();

    const telaCarrinho =
      this.props.carrinho.length <= 0 ? (
        <h2>Carrinho Vazio</h2>
      ) : (
        <div>
          {this.mostrarLista()}
          <div>
            Total:{" "}
            {total.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
            <button onClick={this.props.finalizarCompra}>
              Finalizar Compra
            </button>
            <button onClick={this.props.irParaProdutos}>
              Voltar Para Lista
            </button>
          </div>
        </div>
      );

    return <div>{telaCarrinho}</div>;
  }
}
