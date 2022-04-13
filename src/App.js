import React from 'react'
import axios from 'axios';
import styled from "styled-components"
import Header from './components/Header'
import Cadastro from './components/Cadastro';



export default class App extends React.Component {
  render() {

    return (
          <div>
            LabeNinjas
            <Cadastro/>
          </div>
    )

  }
}

 