import { initializeApp } from "firebase/app";
import { 
    getFirestore, collection, updateDoc, doc, getDoc,
} from "firebase/firestore";
import{
    getAuth, onAuthStateChanged, signOut,
}from "firebase/auth";

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
const auth = getAuth();
const colRef = collection(db, 'users');

let user;

onAuthStateChanged(auth, (u) => {
    if (u) {
        user = u;
        loadUserData(db, user.uid);
        console.log(user.uid);
    } else{
        user = null;
    }
});

const form = document.querySelector('.profile');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    updateUserData(db, user.uid);
});

const logoutbut = document.getElementById('logout');

logoutbut.addEventListener('click', (e) => {
    signOut(auth)
        .then(() => {
            console.log('sucessfully signed out!');
        }).catch((err) => {
            console.log(err.message);
        });
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 8000);
})

async function loadUserData(db, userId) {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const userData = docSnap.data();
      document.querySelector('.uid').innerHTML = userData.userid;
      document.querySelector('#name').value = userData.name;
      document.querySelector('#email').value = userData.email;
      document.querySelector('#phone').value = userData.phone;
      document.querySelector('#age').value = userData.age;
      document.querySelector('#gender').value = userData.gender;
      document.querySelector('#bg').value = userData.bgp;
      document.querySelector('#certid').value = userData.facertid;
      document.querySelector('#valid').value = userData.validtill;
      document.querySelector('#address').value = userData.address;
    } else {
      console.log('User data not found');
    }
}

async function updateUserData(db, userId) {
    const userData = {
      name: document.querySelector('#name').value,
      email: user.email,
      phone: document.querySelector('#phone').value,
      age: document.querySelector('#age').value,
      gender: document.querySelector('#gender').value,
      bgp: document.querySelector('#bg').value,
      facertid: document.querySelector('#certid').value,
      validtill: document.querySelector('#valid').value,
      address: document.querySelector('#address').value,
    };
    await updateDoc(doc(db, 'users', userId), userData);
    alert(`Dear ${userData.name}, your profile has been updated!`);
}