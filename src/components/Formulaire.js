import React, { Component } from 'react'

class Formulaire extends Component {
    // on initialise notre state
    state = {
        message: '',
        length: this.props.length
    }

    createMessage = () => {
        const { addMessage, pseudo, length } = this.props
        // La je recupere ce qui sera visible c'est dire le pseudo et le message
        const message = {
            pseudo,
            // ici c'est le message qui est ds le textarea
            message: this.state.message
        }
        // j'appelle ma fonction 
        addMessage(message)

        // Reset pour vider le textearea et remetre le nombre de caractere a 140
        this.setState({ message: '', length })
    }

    handleSubmit = event => {
        event.preventDefault()
        this.createMessage()
    }

    handleChange = event => {
        //on recupere la valeur saisie ds le textarea
        const message = event.target.value
        // Je veux calculer le nbre de caractère qui me reste a saisir pour faire les 140 autorisées
       // this.props.length c'est le nombre total fixé et message.length c'est ce que je saisi
        const length = this.props.length - message.length
        //on mets a jours le state
        this.setState({ message, length })
    }

    // Des que j'appuis sur la touche entrée mon message est envoyé automatiqument
    handleKeyUp = event => {
        if (event.key === 'Enter') {
            this.createMessage()
        }
    }

    render() {
        return (
            <form
                className='form'
                onSubmit={this.handleSubmit}>
                <textarea
                    value={this.state.message}
                    onChange={this.handleChange}
                    onKeyUp={this.handleKeyUp}
                    required
                    maxLength={this.props.length} />
                <div className='info' >
                    {this.state.length}
                </div>
                <button type='submit' >
                    Envoyer!
        </button>
            </form>
        )
    }
}

export default Formulaire