import React from 'react';
import axios from 'axios';
import styled from "styled-components";
//import Calendar from 'react-calendar';


export default class Cadastro extends React.Component {

state={
  titulo:"",
  descrição:"",
  preco:"",
  pagamento:"",
  data:""
};



onChangeInputTitulo=(e)=>{
this.setState({titulo: e.target.value})
}
onChangeInputDescricao =()=>{

}

onchangeinputPreco =()=>{
  
};



  render() {

    return (

      <div>
        <div>
          <header/>
        </div>
        <h1>Cadastre seu Serviço</h1>
        <input
          placeholder='Titulo do Serviço'
          
        />
        <input
          placeholder='Descrição'
          
        
        />
        <input
          placeholder='Preço'
          
          
        />
        <select multiple>
          <option>Cartão de credito </option>
          <option>Cartão de debito </option>
          <option>Pix </option>
          <option>Boleto bancario</option>
          <option>paypal </option>

        </select>
        <div>
          <button>Cadastrar</button>
        </div>

      

      </div>


          </div>

    )

  }
}