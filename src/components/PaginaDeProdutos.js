import React from 'react'
import styled from "styled-components"
import axios from 'axios'
import { urlBase, headers } from '../constants/variaveisApi'
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
const GrupoDeFiltros = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 10px;
  border: 1px solid black;
`


export default class PaginadeProdutos extends React.Component {

  state = {
    servicos: [],
    ordenacao: "",
    filtroMinimo: "",
    filtroMaximo: "",
    filtroBuscaPorNome: "",

  }

  manipularValorDoFiltroMinimo = (event) => {
    this.setState({
      filtroMinimo: event.target.value
    });
  };

  manipularValorDoFiltroMaximo = (event) => {
    this.setState({
      filtroMaximo: event.target.value
    });
  };

  manipularValorDoFiltroBuscaPorNome = (event) => {
    this.setState({
      filtroBuscaPorNome: event.target.value
    });
  };


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

  atualizaOrdenacao = (e) => {
    this.setState({ ordenacao: e.target.value })
  }

  render() {



    const listaDeServicos = this.state.servicos
      .sort((a, b) => {
        switch (this.state.ordenacao) {
          case 'menor_valor':
            return a.price - b.price;
          case 'maior_valor':
            return b.price - a.price;
          case 'titulo':
            return a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1;
          case 'prazo':
            return new Date(a.dueDate).getTime() > new Date(b.dueDate).getTime()
              ? 1 : -1;
          default:
            break;
        }
      })
      .filter((produto) => {
        return this.state.filtroMinimo === "" || produto.price >= this.state.filtroMinimo
      })

      .filter((produto) => {
        return this.state.filtroMaximo === "" || produto.price <= this.state.filtroMaximo
      })

      .filter((produto) => {
        return produto.title.toUpperCase().includes(this.state.filtroBuscaPorNome.toUpperCase())
      })




      .map((servico) => {

        const data = `${servico.dueDate.slice(8, 10)}/${servico.dueDate.slice(5, 7)}/${servico.dueDate.slice(0, 4)}`

        return (
          <ContainerCard key={servico.id}>
            <h3>{servico.title}</h3>
            <p>Preço: {servico.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
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
          <GrupoDeFiltros>
            <h2>Filtros</h2>
            <div>
              Filtro Mínimo:
              <input type={"number"}
                value={this.state.filtroMinimo}
                onChange={this.manipularValorDoFiltroMinimo}
              />
            </div>

            <div>
              Filtro Máximo:
              <input type={"number"}
                value={this.state.filtroMaximo}
                onChange={this.manipularValorDoFiltroMaximo}
              />
            </div>

            <div>
              Busca por nome:
              <input type={"text"}
                value={this.state.filtroBuscaPorNome}
                onChange={this.manipularValorDoFiltroBuscaPorNome}
              />
            </div>

            <select value={this.state.ordenacao}
              onChange={this.atualizaOrdenacao}>
              <option value="*">Sem ordenação</option>
              <option value="menor_valor">Menor Valor</option>
              <option value="maior_valor" >Maior Valor</option>
              <option value="titulo">Titulo</option>
              <option value="prazo">Prazo</option>
            </select>
          </GrupoDeFiltros>

        </ContainerFiltros>

        <ContainerProdutos>
          {listaDeServicos}
        </ContainerProdutos>

      </ContainerPrincipal>
    )

  }
}