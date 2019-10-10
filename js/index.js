const firebaseConfig = {
    apiKey: "AIzaSyAtyNq-jpPAPWkOqPxfw-k0LdcKuX-jQYg",
    authDomain: "materi-fb.firebaseapp.com",
    databaseURL: "https://materi-fb.firebaseio.com",
    projectId: "materi-fb",
    storageBucket: "materi-fb.appspot.com",
    messagingSenderId: "66417248213",
    appId: "1:66417248213:web:525e42d5aef05913025f5c"
};

const fb        = firebase.initializeApp(firebaseConfig);
const database  = fb.database();
database.ref().once('child_added', function (snapshot) {
    if (snapshot.exists()) {
        let content = '';
        let i = 1;
        snapshot.forEach(function (data) {
            let val = data.val();
            content += '<tr>';
            content += `<td> ${i++}) </td>`;
            content += `<td width="400px">${val.nama}</td>`;
            content += `<td><a href="${val.url}"><img src="${val.url}" width="200px"></a></td>`;
            content += '</tr>';
        });
        document.getElementById('table').innerHTML = content;
    }
});