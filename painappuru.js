const firebase = require('firebase')
const moment = require('moment')

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

new Date().toLocaleString()

function logRow(doc) {
    const d = doc.data().timestamp.toDate();

    return `<div class="log-row">
        <div class="log-event">${doc.data().event}</div>
        <div class="log-users">
            ${doc.data().users.map(logUser).join(", ")}
        </div>
        <div class="log-date">${moment(d).format("YYYY-MM-DD hh:mm:ss")}</div>
    </div>`
}

function notDefault(doc) {
    return doc.id !== 'default';
}

function updateLogTable(snap) {
    logs.innerHTML = snap.docs
        .filter(notDefault)
        .map(logRow)
        .join("")
}

tallies.onSnapshot(snap => {
    updateLogTable(snap);
});
