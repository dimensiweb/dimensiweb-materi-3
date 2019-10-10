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
        snapshot.forEach(function (data) {
            let val = data.val();
            content += '<li>';
                content += '<div class="uk-card uk-card-default">';
                    content += '<div class="uk-card-media-top img-container">';
                        content += '<img src="assets/addiction-adult-blond-1624264.jpg" alt="">';
                    content += '</div>';
                    content += '<div>';
                        content += '<div class="uk-card-body">';
                            content += `<h3 class="uk-card-title">${val.nama}</h3>`;
                            content += `<p>${val.deskripsi}</p>`;
                        content += '</div>';
                    content += '</div>';
                content += '</div>';
            content += '</li>';
        });
        document.getElementById('isi-gallery').innerHTML = content;
    }
});
