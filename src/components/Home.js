import React from 'react'
import axios from 'axios'
import styled from "styled-components"
import Header from './Header'

export default class Home extends React.Component {
  render() {

    return (
      <div>
        <Header />

        <div>
          <h1>LabeNinjas</h1>
          <p>O talento certo no momento certo</p>
        </div>

        <div>

          <button>Quero ser um ninja</button>
          <button>Quero contratar um ninja</button>
        </div>
      </div>
    )

  }
}