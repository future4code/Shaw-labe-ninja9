import React from 'react'
import axios from 'axios'
import styled from "styled-components"
import { headers, urlBase } from '../constants/variaveisApi'

const ContainerPagina = styled.div`
  display: flex;
  justify-content: center;
  background-color: #F5F4FC;
  min-height: 100vh;
  padding-top: 50px;
`

const ContainerServico = styled.div`
display: flex;
flex-direction: column;
background-color: #E9E5FF;
border-radius: 16px;
width: 500px;
height: 500px;
justify-content: space-around
`

export default class DetalheDeProduto extends React.Component {

  state = {
    detalhes: [],
    metodosDePagamento: []
  }

  componentDidMount() {
    this.mostraDetalhesDoServico()
  }

  mostraDetalhesDoServico = () => {
    axios
    .get(`${urlBase}/jobs/${this.props.id}`, headers)
    .then((res) => {
      this.setState({
        detalhes: [res.data],
        metodosDePagamento: res.data.paymentMethods
      })
    })
    .catch((err) => alert(err.response))
  }

  render() {

    const listaDeDetalhes = this.state.detalhes.map((detalhe) => {

      const preco = detalhe.price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL' })
      const data = `${detalhe.dueDate.slice(8,10)}/${detalhe.dueDate.slice(5,7)}/${detalhe.dueDate.slice(0,4)}`

      return (
        <div key={detalhe.id}>
          <h2>{detalhe.title}</h2>
          <p>{detalhe.description}</p>
          <p>{preco}</p>
          <p>até {data}</p>
        </div>
      )
    })

    const Pagamentos = this.state.metodosDePagamento.map((metodo) => {
      return (
        <p key={metodo}>{metodo}</p>
      )
    })

    return (
    <ContainerPagina>

      <ContainerServico>

        <div>
        {listaDeDetalhes}
          <p>Formas de pagamento:</p>
          {Pagamentos}
        </div>

        <div>
          <button onClick={this.props.irParaProdutos}>Encontrar outro ninja</button>
          <button>Adicionar ao carrinho</button>
        </div>
      </ContainerServico>

    </ContainerPagina>
    )

  }
}