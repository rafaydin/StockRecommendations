import React from 'react';
import styled from 'styled-components'
import Form from './components/form'
import './App.css';

const Styles = styled.div`


`


function App() {
  return (
    <Styles>
      <div className="App">
        <h1>Stock Recomendations by Rafay Din</h1>
        <div>Please rank the importance of each company value below</div> <br/> <br/>
        <Form></Form>
      </div>
    </Styles>
  );
}

export default App;
