import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import AppNavbar from './components/AppNavbar'
import ShoppingList from './components/ShoppingList'
import ItemModal from './components/ItemModal'
import { Container } from 'reactstrap'
import { Provider } from 'react-redux'
import store from './store'
import './App.css'

export default class App extends Component {
  render() {
    return (
    	<Provider store={ store }>
	      <div>
	        <AppNavbar />
          <Container>
            <ItemModal />
            <ShoppingList />
          </Container>
	      </div>
    	</Provider>
    )
  }
}
