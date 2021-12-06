importScripts('https://www.gstatic.com/firebasejs/9.4.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.4.1/firebase-messaging-compat.js');
firebase.initializeApp({
    apiKey: "AIzaSyBWpa2_gNPGYfI46yeMzusy8I8BeHghfzM",
    authDomain: "redega-system.firebaseapp.com",
    databaseURL: "https://redega-system-default-rtdb.firebaseio.com",
    projectId: "redega-system",
    storageBucket: "redega-system.appspot.com",
    messagingSenderId: "191365025379",
    appId: "1:191365025379:web:ab9ca113d0d49e03b2f256",
    measurementId: "G-WSPM9PE736"
});
const messaging = firebase.messaging();