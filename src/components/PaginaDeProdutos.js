import React from 'react'
import styled from "styled-components"
import axios from 'axios';
import Header from './Header'

const InputContainer = styled.div`
padding: 10px;
display: flex;
justify-content:space-around;
`




export default class PaginadeProdutos extends React.Component {
  render() {

    return (
      <div>
        {/* <Header/> */}
        <InputContainer>
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
        </InputContainer>
        
      </div>
    )

  }
}