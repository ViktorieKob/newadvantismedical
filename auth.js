import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD4j1bO7JDbzUM-ca4AWUSkGYpmglWK_IQ",
  authDomain: "dochazka-app.firebaseapp.com",
  projectId: "dochazka-app",
  storageBucket: "dochazka-app.appspot.com",
  messagingSenderId: "912220280247",
  appId: "1:912220280247:web:e0b27491b9234cba984432"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.login = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      if (email.includes("vedouci")) {
        window.location.href = "dashboard-v.html";
      } else {
        window.location.href = "dashboard.html";
      }
    })
    .catch(error => {
      alert("Chyba přihlášení: " + error.message);
    });
};