import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD4j1bO7JDbzUM-ca4AWUSkGYpmglWK_IQ",
  authDomain: "dochazka-app.firebaseapp.com",
  projectId: "dochazka-app",
  storageBucket: "dochazka-app.appspot.com",
  messagingSenderId: "912220280247",
  appId: "1:912220280247:web:e0b27491b9234cba984432"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const container = document.getElementById("smeny-container");

async function nactiSmeny() {
  const querySnapshot = await getDocs(collection(db, 'smeny'));
  container.innerHTML = '';

  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const wrapper = document.createElement('div');
    wrapper.className = 'směna-box';

    const title = document.createElement('h3');
    title.textContent = `Směna: ${data.datum} – ${data.email}`;
    wrapper.appendChild(title);

    const seznamPacientu = document.createElement('ul');
    data.pacienti?.forEach((p) => {
      const item = document.createElement('li');
      item.textContent = `${p.jmeno} – ${p.cas} (${p.procedura}) \nPoznámka: ${p.komentar}`;
      seznamPacientu.appendChild(item);
    });
    wrapper.appendChild(seznamPacientu);

    const tlacitko = document.createElement('button');
    tlacitko.textContent = data.ulozeno ? 'Upravit směnu' : 'Uložit směnu';
    tlacitko.addEventListener('click', async () => {
      const ref = doc(db, 'smeny', docSnap.id);
      await updateDoc(ref, {
        ulozeno: !data.ulozeno
      });
      alert(`Směna byla ${data.ulozeno ? 'odemčena' : 'uzamčena'}!`);
      await nactiSmeny();
    });
    wrapper.appendChild(tlacitko);

    container.appendChild(wrapper);
  });
}

nactiSmeny();