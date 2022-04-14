import React from 'react'
import styled from "styled-components"
import axios from 'axios'
import { urlBase, headers } from '../constants/variaveisApi'


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
  flex-wrap: wrap;
  background-color: #F5F4FC;
  column-gap: 42px;
  row-gap: 30px;
  padding: 30px;
  align-content: flex-start;
  justify-content: space-between;
`

const ContainerCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #E9E5FF;
  font-family: 'Montserrat', sans-serif;
  padding: 20px;
  border-radius: 15px;
  height: 250px;
  width: 300px;
  justify-content: space-around;
  box-shadow: 0 4px 9px 0 #9F96D9, 0 5px 10px 0 rgb(0 0 0 / 19%);

  h2 {
    font-size: 2em;
    text-align: center;
    margin: 0;
  }

  h3 {
    font-size: 1.7em;
    color: #7165BF;
  }

  p {
    font-size: 1.2em;
  }
`
const ContainerBotoes = styled.div`
  display: flex;
  justify-content: space-between;
`
const Botao = styled.button`
  background-color: #FFFFFF;
  height: 30px;
  width: 140px;
  border: 1px solid #9F96D9;
  color: #9F96D9;
  border-radius: 5px;

  :hover {
    cursor: pointer;
    background-color: #9F96D9;
    color: #FFFFFF;
  }
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
            <h2>{servico.title}</h2>

            <div>
              <h3>{servico.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
              <p>até: {data}</p>
            </div>

            <ContainerBotoes>
              <Botao onClick={() => this.props.irParaDetalhes(servico.id)}>Detalhes</Botao>
              <Botao onClick={() => this.props.adicionarAoCarrinho(servico)}>Adicionar ao carrinho </Botao>
            </ContainerBotoes>
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