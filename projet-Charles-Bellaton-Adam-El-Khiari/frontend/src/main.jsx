//point d'entrée de l'application React 
//pont entre index (html) et le React (JavaScript)

//2 librairies de base
import React from 'react'
//lien entre react et le vrai DOM
import ReactDOM from 'react-dom/client'
//permet de faire du routing (navigation sans recharger la page)
//il dit a React de surveiller l'URL et quel composant afficher  
import {BrowserRouter} from 'react-router-dom'
//composant principal app et les styles globaux de scss
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './styles/main.scss'

//créé un ancrage dans le div
ReactDOM.createRoot(document.getElementById('root')).render( //injecte
  <BrowserRouter>
    <App /> 
  </BrowserRouter>
)
//fonction app dans App.jsx
