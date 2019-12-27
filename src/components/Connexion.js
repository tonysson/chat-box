
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

class Connexion extends Component {

    state ={
        // On cree un state et oin initie le pseudo a vide
        pseudo: '',
        goToChat : false
    }

    handleChange = event => {
        // on recupere la valeur saisie dans le champs
        const pseudo =  event.target.value;
        //On mets à jour le state
        this.setState({pseudo});
    }

    handleSubmit = event => {
        //J'annule le rechargeement par defaut de la page
        event.preventDefault();
        this.setState({goToChat: true})
        // quand on rajoute push il se deplace vers l'autre page sans changer la page dans le navigateur
    }


    render() {

        if(this.state.goToChat){
            return(
                <Redirect push to= {`/pseudo/${this.state.pseudo}`}></Redirect>
            )
        }
        return (
            <div className ='connexionBox'>
                <form className="connexion" onSubmit = {this.handleSubmit}>
                    <input
                    value ={this.state.pseudo}
                    onChange ={this.handleChange}
                    placeholder="Pseudo"
                    type='text'
                    required/>

                    <button type='submit'>Go</button>

                </form>
                
            </div>
        )
    }
}
export default Connexion

