import React from 'react'
import axios from 'axios'
import styled from "styled-components"
import Home from './Home'
import Carrinho from './Carrinho'

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
        <div>
          Carrinho
        </div>
    )

  }
}