
import { auth } from './firebase-config.js';
import { 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword 
} from 'firebase/auth';

const provider = new GoogleAuthProvider();

document.getElementById('googleSignIn').addEventListener('click', async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = '/index.html';
    } catch (error) {
        console.error(error);
        alert('Error signing in with Google');
    }
});

document.getElementById('emailSignIn').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        localStorage.setItem('user', JSON.stringify(userCredential.user));
        window.location.href = '/';
    } catch (error) {
        console.error(error);
        alert('Error signing in with email/password');
    }
});

document.getElementById('toggleSignUp').addEventListener('click', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        localStorage.setItem('user', JSON.stringify(userCredential.user));
        window.location.href = '/';
    } catch (error) {
        console.error(error);
        alert('Error creating account');
    }
});
