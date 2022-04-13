import React from 'react';
import axios from 'axios';
import styled from "styled-components";

const ContainerInputs = styled.div `
display: flex;
flex-direction: column;
align-items: center;

input{
  margin-top: 5px;
  height:2em;
  width:25%;
}
select{
  margin-top: 5px;
  width:25%
}
button{

}


`

const headers = {
  headers: {
      Authorization: ""
  }
};
export default class Cadastro extends React.Component {

  state = {
    titulo: "",
    descricao: "",
    preco: "",
    pagamento: "",
    data: ""


  };

  CriarCadastros = () => {
    const bodyCadatros = {
      title: this.state.titulo,
      description: this.state.descricao,
      price: this.state.preco,
      paymentMethods: this.state.pagamento,
      dueDate: this.state.data
    }

    const urlPost = ""
    axios.post(urlPost, headers)
      .then((res) => this.setState({}))
      .catch((err) => {
        alert("")
      })

  };


  onChangeInputTitulo = (e) => {
    this.setState({ titulo: e.target.value })
  }
  onChangeInputDescricao = (e) => {
    this.setState({ descricao: e.target.value })
  }

  onchangeInputPreco = (e) => {
    this.setState({ preco: e.target.value })
  };
  onChangeData = (e) => {
    this.setState({ data: e.target.value })
  }



  render() {

    return (
      <div>
        <div>
          <header />
        </div>
        <ContainerInputs >
        <h1>Cadastre seu Serviço</h1>
        <input
          placeholder='Titulo do Serviço'
          onChange={this.onChangeInputTitulo}
          value={this.state.titulo}
        />
        <input
          placeholder='Descrição'
          onChange={this.onChangeInputDescricao}
          value={this.state.descricao}

        />
        <input
          type='number'
          placeholder='Preço'
          onChange={this.onchangeInputPreco}
          value={this.state.preco}

        />
        <select multiple>
          <option>Cartão de credito </option>
          <option>Cartão de debito </option>
          <option>Pix </option>
          <option>Boleto bancario</option>
          <option>paypal </option>

        </select>

        <input
            type='date'
            value={this.state.data}
            onChange={this.onChangeData}
          />
          </ContainerInputs >
        
          <button>Cadastrar</button>
        
        <div>
          



        </div>

      </div>

    )

  }
}