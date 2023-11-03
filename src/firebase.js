import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMsIik2a_DMIMSNrS5kPd0brlJwqoOwZQ",
  authDomain: "chatapp-548bb.firebaseapp.com",
  projectId: "chatapp-548bb",
  storageBucket: "chatapp-548bb.appspot.com",
  messagingSenderId: "644977261108",
  appId: "1:644977261108:web:e8a87ef19bc302e856a861"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
const firestore = getFirestore(firebaseApp);

export { auth, firestore };
