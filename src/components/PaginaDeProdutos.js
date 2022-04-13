import React from 'react'
import styled from "styled-components"
import axios from 'axios'
import {urlBase, headers} from '../constants/variaveisApi'
import Cadastro from "./Cadastro"
import PaginaDeProdutos from "./PaginaDeProdutos"

const ContainerPrincipal = styled.div`
  display: flex;
`

const ContainerFiltros = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 10px;
  border: 1px solid black;
`

const ContainerProdutos = styled.div`
  display: flex;
  padding: 10px;
`

const ContainerCard = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  height: 250px;
`


export default class PaginadeProdutos extends React.Component {

  state = {
    servicos: []
  }

  componentDidMount() {
    this.mostrarTodosOsServicos()
  }

  mostrarTodosOsServicos = () => {
    axios
    .get(`${urlBase}/jobs`, headers)
    .then((res) => {
      this.setState({
        servicos: res.data.jobs
      })
    })
    .catch((err) => alert(err.response))
  }

  render() {

    const listaDeServicos = this.state.servicos.map((servico) => {

      const data = `${servico.dueDate.slice(8,10)}/${servico.dueDate.slice(5,7)}/${servico.dueDate.slice(0,4)}`

      return (
        <ContainerCard key={servico.id}>
          <h3>{servico.title}</h3>
          <p>Preço: {servico.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
          {/* <p>{servico.price}</p> */}
          <p>Prazo: {data}</p>

          <div>
            <button onClick={() => this.props.irParaDetalhes(servico.id)}>Detalhes</button>
            <button onClick={() => this.props.adicionarAoCarrinho(servico)}>Adicionar ao carrinho </button>
          </div>
        </ContainerCard>
      )
    })

    return (
      <ContainerPrincipal>

        <ContainerFiltros>
          <input
            placeholder='Valor Mínimo'
            type='Number'
          />
          <input
            placeholder='Valor Maximo'
            type='Number'
          />
          <input
            placeholder='Buscar por titulo ou descrição'
            type='text'
          />
          <select name="Sem ordenação">
            <option value="valor1">Sem ordenação</option>
            <option value="valor2">Menor Valor</option>
            <option value="valor3" >Maior Valor</option>
            <option value="valor4">Titulo</option>
            <option value="valor5">Prazo</option>
          </select>
        </ContainerFiltros>

        <ContainerProdutos>
          {listaDeServicos}
        </ContainerProdutos>

      </ContainerPrincipal>
    )

  }
}