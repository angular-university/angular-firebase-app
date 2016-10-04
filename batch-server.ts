
import {firebaseConfig} from "./src/environments/firebase.config";
import {initializeApp, auth} from 'firebase';

console.log('Running batch server ...');

initializeApp(firebaseConfig);


auth()
    .signInWithEmailAndPassword('admin@angular-university.io', 'test123')
    .then(runConsumer)
    .catch(onError);

function onError(err) {
    console.error("Could not login", err);
    process.exit();
}

function runConsumer() {
    console.log("Running consumer ...");
}




