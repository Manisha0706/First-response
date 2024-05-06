import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, getDocs, getDoc, query, where, doc,
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBB6mk4lJ3yQzPmltTFssmfJ_jHWBHzxLY",
    authDomain: "flash-ascent-413807.firebaseapp.com",
    projectId: "flash-ascent-413807",
    storageBucket: "flash-ascent-413807.appspot.com",
    messagingSenderId: "578381693616",
    appId: "1:578381693616:web:7aa9fbcfb02a852ebf3175",
    measurementId: "G-PH2PS2KCRR"
};

initializeApp(firebaseConfig);
const db = getFirestore();

const eSelect = document.getElementById('sel');
const getTipsBtn = document.getElementById('get-tips');
const tipsList = document.getElementById('tips-cont');

const colRef = collection(db, 'fatips');

getDocs(colRef)
.then(querySnapshot => {
    const uniqueSit = [...new Set(querySnapshot.docs.map(doc => doc.data().situation))];
    uniqueSit.sort();

    uniqueSit.forEach(EmgSit => {
        const option = document.createElement('option');
        option.value = EmgSit;
        option.textContent = EmgSit;
        eSelect.appendChild(option);
    });
})
.catch(error => {
    console.error('Error fetching options:', error);
    alert('An error occurred while loading emergency situations.');
});


getTipsBtn.addEventListener('click', async () => {
    const EmgSit = eSelect.value;
    if (!EmgSit) {
        alert('Please select an emergency situation!');
        return;
    }
  
    try {
        const docRef = doc(db, 'fatips', EmgSit);
        // const tipQuery = query(collection(db, 'tips'), where('situation', '==', EmgSit));
        const tipDoc = await getDoc(docRef);

        tipsList.innerHTML = '';

        if (tipDoc.exists()) {
            const tip = tipDoc.data();
            const tipItem = document.createElement('div');
            tipItem.classList.add('tip-item');
            tipItem.innerHTML = `
            <h2>${tip.situation}</h2>
            <p>${tip.symp}</p>
            <h3 id="hh3"><b>What to do:</b></h3>
            <p id="basic">${tip.basicfirstaid}</p>
            <p id="mid">${tip.midfirstaid}</p>
            
            <h3 id="reminder">Seek medical attention if the condition persits!</h3>
            `;
            tipsList.appendChild(tipItem);
        } else{
            tipsList.textContent = 'No tips found for this emergency situation.';
        }
    } catch (error) {
        console.error('Error fetching tips:', error);
        alert('An error fetching tips data occurred. Please try again later.');
    }
});