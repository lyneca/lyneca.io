const firebase = require('firebase')

const body = document.getElementById("body");
const logs = document.getElementById("logs");

const config = {
    apiKey: "AIzaSyDsvwyeVMrcdDdpEREAjTVOnu7TKgd3ou4",
    authDomain: "painappuru-discord-bot.firebaseapp.com",
    databaseURL: "https://painappuru-discord-bot.firebaseio.com",
    projectId: "painappuru-discord-bot",
    storageBucket: "painappuru-discord-bot.appspot.com",
    messagingSenderId: "1037019693245"
};

firebase.initializeApp(config);

const firestore = firebase.firestore();

const tallies = firestore.collection("tallies");
const events = firestore.collection("event");

function logUser(name) {
    return `<div class="log-user">${name}</div>`
}

function logRow(doc) {
    return `<div class="log-row">
        <div class="log-event">${doc.data().event}</div>
        <div class="log-users">
            ${doc.data().users.map(logUser).join(", ")}
        </div>
        <div class="log-date">${doc.data().timestamp.toDate().toLocaleString()}</div>
    </div>`
}

function notDefault(doc) {
    return doc.id !== 'default';
}

function updateLogTable(snap) {
    console.log(snap)
    logs.innerHTML = snap.docs
        .filter(notDefault)
        .map(logRow)
        .join("")
}

tallies.onSnapshot(snap => {
    updateLogTable(snap);
});
