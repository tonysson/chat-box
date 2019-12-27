import Rebase from 're-base';
import firebase from 'firebase/app';
import 'firebase/database'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCcGFhtKZJYvFnbcvaYhGdrHg7Rcbe7Ksk",
    authDomain: "chat-6ac24.firebaseapp.com",
    databaseURL: "https://chat-6ac24.firebaseio.com"
})

const base = Rebase.createClass(firebase.database())

export { firebaseApp }
export default base ;