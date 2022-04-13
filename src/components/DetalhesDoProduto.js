import React from 'react'
import axios from 'axios'
import styled from "styled-components"
import { headers, urlBase } from '../constants/variaveisApi'

export default class DetalheDeProduto extends React.Component {

  state = {
    detalhes: []
  }

  componentDidMount() {
    this.mostraDetalhesDoServico()
  }

  mostraDetalhesDoServico = () => {
    axios
    .get(`${urlBase}/jobs/${this.props.id}`, headers)
    .then((res) => {
      this.setState({
        detalhes: [res.data]
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
          <p>Preço: {preco}</p>
          <p>Prazo: {data}</p>
        </div>
      )
    })

    return (
    <div>
        {listaDeDetalhes}

        <div>
          <button onClick={this.props.irParaProdutos}>Encontrar outro ninja</button>
          <button>Adicionar ao carrinho</button>
        </div>
    </div>
    )

  }
}