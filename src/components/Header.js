import React from 'react'
import axios from 'axios'
import styled from "styled-components"
import Home from './Home'
import Carrinho from './Carrinho'

const MainContainer = styled.div`
  background-color: #7165bf;
  color: white;
  display: flex;
  justify-content: space-between;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`

const AreaDosBotoes = styled.div`
  padding: 25px;
  justify-content: center;
  align-items: center;
  display: flex;
`

const Titulo = styled.p`
  padding: 25px;
  justify-content: center;
  align-items: center;
  display: flex;
  font-size: 20px;
`
const Botao = styled.button`
  background-color: #7165bf;
  color: white;
  font-size: 18px;
  border: 0;
  margin: 20px;
  padding: 8px 16px;
  &:hover{
    background-color: #9f96d9;
  }
`




export default class Header extends React.Component {

  render() {

    return (
      <MainContainer>
        <Titulo><b>LabeNinjas</b></Titulo>
        <AreaDosBotoes>
          <Botao onClick={this.props.irParaHome} style={{cursor:'pointer'}}>Home</Botao>
          <Botao onClick={this.props.irParaCarrinho} style={{cursor:'pointer'}}>Carrinho</Botao>
        </AreaDosBotoes>
      </MainContainer>
    )

  }
}