import React, { Component, createRef } from 'react';
import './App.css';
import './animations.css';
import Formulaire from './components/Formulaire';
import Message from './components/Message';

//Firebase
import base from './base';
// Animations
import { CSSTransition,TransitionGroup} from 'react-transition-group';


class App extends Component {

  state = {
    // ON INITIALISE TOUS NOS MESSAGES DANS UN OBJET VIDE
    messages :{},

    // ICI JE VEUX RECUPERER MON PSEUDO, quand on fais un console.log(App) on voit que le react-router nous genere le pseudo dans un  props qui est accessible dans params apres je le passe dans mon Formulaire avec this.state.pseudo

    pseudo: this.props.match.params.pseudo
  }


  //Pour corriger le scroll au moment d'envoi des messages: je veux le scroll automatique a chaque fois que j'envoi un nouveau message. J'envoi un nouveau message a chaque fois que mon state est mise a jour. Avec le cycle de vie ds react on a la methode componentDiUpdate() qui nous permet de le savoir. j'appelle donc cette methode pour faire des actions a chaque cycle de vie.

  messagesRef = createRef()


  componentDidUpdate(){
    // la j'appelle l'element sur lequel mon ref est appelé , c'est a dire la div qui contient les messages
    const ref = this.messagesRef.current
    // je definis ma logique, je veux que mon scrolltop soit egale au scrollmax de l'ecran a chaque envoi de message
    ref.scrollTop = ref.scrollHeight

  }

  //Configuration du componentdidMount pour enreigistrer nos messages ds firebase
  componentDidMount() {
    base.syncState('/', {
      context: this,
      state: 'messages'
    })
  }



  addMessage = message =>{
    // On recupere une copie de notre objet messages
     const messages = {...this.state.messages};
     // je recupere messages avec un id unique qui est donc le timestamp de mon objet messages
     messages[`message-${Date.now()}`] = message;
     //On veut garder que les 10 derniers messages ds le tchat: slice permet de couper un array
     Object.keys(messages).slice(0, -4).forEach(key =>{
       messages[key] = null
     })
     // on mets a jour le state
     this.setState({  messages })
  }

  // Je veux creer une methode pour separer le message de l'utilisateur connecté et de l'utlisateur qui envoi
  isUser = pseudo => pseudo === this.state.pseudo

  render () {
    // Je veux recuperer mes messages et l'afficher sur l'ecran,
    // ds keys(this.state.messages) je recupere et mon message et mon pseudo
    // je boucle sur chaque keys et je l'affiche avec .map()
    //this.state.messages[key]  je recupere le message qui contient et mon message et mon pseudo
    //this.state.messages[key].pseudo je recupere le pseudo
    //this.state.messages[key].message je recuper le message

    const messages = Object
    .keys(this.state.messages)
    .map(key => (
      <CSSTransition 
      classNames='fade'
      time = {2000}
      key={key}>
        <Message
          isUser={this.isUser}
          pseudo={this.state.messages[key].pseudo}
          message={this.state.messages[key].message}
        />
      </CSSTransition>
    ))
    return (
      <div className='box' >
        <div>
          <div className="messages" ref ={ this.messagesRef}>
            <TransitionGroup className="message">
              { messages }
            </TransitionGroup>
          </div>
        </div>
        <Formulaire 
        length = { 140 }
        addMessage={this.addMessage} 
        pseudo={this.state.pseudo}/>
      </div>  
    )
  }
}

export default App;
