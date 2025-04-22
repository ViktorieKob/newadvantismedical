import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js';

const firebaseConfig = {
  // Firebase config sem
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.login = function () {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (user.email === 'vedouci@test.cz') {
        window.location.href = 'zadosti.html';
      } else if (user.email === 'sestra@test.cz') {
        window.location.href = 'dashboard.html';
      } else {
        alert('Neznámý uživatel.');
      }
    })
    .catch((error) => {
      alert('Chyba při přihlášení: ' + error.message);
    });
};