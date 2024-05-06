document.cookie = "name=value; SameSite=None; Secure";

import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, setDoc, updateDoc, doc,
} from 'firebase/firestore';
import{
  getAuth, createUserWithEmailAndPassword,
} from 'firebase/auth'

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

let userdata, uid;
var lat, lng;

navigator.geolocation.getCurrentPosition(function(position) {
  lat = position.coords.latitude;
  lng = position.coords.longitude;
});

const form = document.querySelector('.login');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const uname = form.name.value;
  const uemail = form.email.value;
  const upass = form.password.value;
  const uphone = form.phone.value;

  createUserWithEmailAndPassword(auth, uemail, upass)
    .then((cred) => {
      const user = cred.user;
      uid = user.uid;
      const userDocRef = doc(db, 'users', uid);
      userdata = {
        name: uname,
        email: uemail,
        phone: uphone,
        latitude: lat,
        longitude: lng,
        gender: "",
        bgp: "",
        age: "",
        facertid: "",
        validtill: "",
        address: "",
        userid: uid,
      }
      console.log('user created:', user);
      return setDoc(userDocRef, userdata);
    })
    .then(() => {
      console.log('document created successfully!');
      alert(`Account created for ${uname}!`);

      setTimeout(() => {
        window.location.href = 'homes.html';
      }, 10000);
    })
    .catch((err) => {
      console.error('cannot create account', err.message);
  });
});

// const googleAuthLink = document.getElementById('google-auth-link');

// googleAuthLink.addEventListener('click', event => {
//   event.preventDefault();
//   const clientId = '578381693616-h67bvgd6lu0bm4hmq6q5nli3j75thjbh.apps.googleusercontent.com';
//   const redirectUri = 'http://127.0.0.1:5500/webapp/home.html';
//   const scope = 'email';
//   const responseType = 'code';
//   const state = 'STATE_VALUE';
//   const authUri = `https://accounts.google.com/o/oauth2/v2/auth?
//     client_id=${clientId} &
//     response_type=${responseType} &
//     scope=${scope} &
//     redirect_uri=${redirectUri}&
//     state=${state}`;

//   // Open the Google authentication page in a new window
//   window.open(authUri, 'google-auth', 'width=500,height=600');
// });