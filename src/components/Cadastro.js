import React from "react";
import axios from "axios";
import styled from "styled-components";
import { headers } from "../constants/variaveisApi";
import { urlBase } from "../constants/variaveisApi";

const ContainerInputs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    margin-top: 5px;
    height: 2em;
    width: 25%;
  }
  select {
    margin-top: 5px;
    width: 25%;
  }
  button {
  }
`;

export default class Cadastro extends React.Component {
  state = {
    titulo: "",
    descricao: "",
    preco: "",
    pagamento: [],
    data: "",
  };

  criarCadastros = () => {
    const bodyCadatros = {
      title: this.state.titulo,
      description: this.state.descricao,
      price: Number(this.state.preco),
      paymentMethods: this.state.pagamento,
      dueDate: this.state.data,
    };

    axios
      .post(`${urlBase}/jobs`, bodyCadatros, headers)
      .then((res) => {
        this.setState({
          titulo: "",
          descricao: "",
          preco: "",
          pagamento: "",
          data: "",
        });
        alert("cadastro com sucesso !");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  onChangeInputTitulo = (e) => {
    this.setState({ titulo: e.target.value });
  };
  onChangeInputDescricao = (e) => {
    this.setState({ descricao: e.target.value });
  };

  onchangeInputPreco = (e) => {
    this.setState({ preco: e.target.value });
  };
  onChangeData = (e) => {
    this.setState({ data: e.target.value });
  };
  onChangeInputPagamento = (e) => {
    const valor = Array.from(e.target.selectedOptions, option => option.value)
    this.setState({pagamento: valor})
  };

  render() {
    return (
      <div>
        <div>
          <header />
        </div>
        <ContainerInputs>
          <h1>Cadastre seu Serviço</h1>
          <input
            placeholder="Titulo do Serviço"
            onChange={this.onChangeInputTitulo}
            value={this.state.titulo}
          />
          <input
            placeholder="Descrição"
            onChange={this.onChangeInputDescricao}
            value={this.state.descricao}
          />
          <input
            type="number"
            placeholder="Preço"
            onChange={this.onchangeInputPreco}
            value={this.state.preco}
          />

          <select
            multiple
            onChange={this.onChangeInputPagamento}
            value={this.state.pagamento}
          >
            <option value={'credito'}>Cartão de credito </option>
            <option value={'debito'}>Cartão de debito </option>
            <option value={'pix'}>Pix </option>
            <option value={'boleto'}>Boleto bancario</option>
            <option value={'paypal'}>paypal </option>
          </select>

          <input
            type="date"
            value={this.state.data}
            onChange={this.onChangeData}
          />
        </ContainerInputs>

        <button onClick={this.criarCadastros}>Cadastrar</button>

        <div></div>
      </div>
    );
  }
}
