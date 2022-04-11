import React from 'react'
import axios from 'axios'
import styled from "styled-components"

const MainContainer = styled.div`
  border: 1px solid black;
  background-color: lightseagreen;
  display: flex;
  justify-content: space-between;
`

const Cabecalho = styled.div`
  padding: 25px;
`


export default class Header extends React.Component {
  render() {

    return (
        <MainContainer>
          <Cabecalho>
            Nome do Projeto
          </Cabecalho>
          <Cabecalho>
            <button>Home</button>
            <button>Carrinho</button>
          </Cabecalho>
        </MainContainer>
    )

  }
}