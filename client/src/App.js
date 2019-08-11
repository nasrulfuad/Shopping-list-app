import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import AppNavbar from './components/AppNavbar'
import ShoppingList from './components/ShoppingList'
import './App.css'

class App extends Component {
  render() {
    return (
      <div>
        <AppNavbar />
        <ShoppingList />
      </div>
    )
  }
}

export default App
