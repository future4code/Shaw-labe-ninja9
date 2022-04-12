import React from 'react'
import axios from 'axios'
import styled from "styled-components"
import Header from './Header'
import Cadastro from "./Cadastro"
import PaginaDeProdutos from "./PaginaDeProdutos"

const ContainerHome = styled.div`
display: flex;
align-items: center;
flex-direction: column;
`
const ButtonCadastro = styled.div`
display: flex;
justify-content: center;
`
export default class Home extends React.Component {


  render() {

    return (
      <div>
           <ContainerHome>
          <h1>LabeNinjas</h1>
          <p>O talento certo no momento certo</p>
        </ContainerHome>
        <ButtonCadastro>
          <button onClick={this.props.irParaCadastro}>Quero ser um ninja</button>
          <button onClick={this.props.irParaProdutos}>Quero contratar um ninja</button>
        </ButtonCadastro>
      </div>
    )

  }
}