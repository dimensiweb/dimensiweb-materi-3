const firebaseConfig = {
    apiKey: "AIzaSyAtyNq-jpPAPWkOqPxfw-k0LdcKuX-jQYg",
    authDomain: "materi-fb.firebaseapp.com",
    databaseURL: "https://materi-fb.firebaseio.com",
    projectId: "materi-fb",
    storageBucket: "materi-fb.appspot.com",
    messagingSenderId: "66417248213",
    appId: "1:66417248213:web:525e42d5aef05913025f5c"
};

const fb            = firebase.initializeApp(firebaseConfig);
const storageRef    = fb.storage().ref();
const uploader      = document.getElementById('uploader');
const nama          = document.getElementById('nama');
const deskripsi     = document.getElementById('deskripsi');
let file_gambar     = "";

function previewFile() {
    let file        = document.querySelector('input[type=file]').files[0];
    let metadata    = {contentType: 'image/jpeg'};
    file_gambar     = file.name;
    let uploadTask  = storageRef.child('gallery/' + file.name).put(file, metadata);
    uploadTask.on('state_changed', function (snapshot) {
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(percentage);
        uploader.value = percentage;
    }, function (error) {
        console.log('error while uploading')
    }, function () {
        let starsRef = storageRef.child('gallery/' + file.name);
        starsRef.getDownloadURL().then(function (url) {
            document.querySelector('#preview').src = url;
        }).catch(function (error) {
            console.log('error while downloading file');
        });
    });
}

document.getElementById("form_upload").addEventListener("submit", function(e){
    e.preventDefault();
    let entry = {};
    let nama = file_gambar;
    let nm_db = "https://firebasestorage.googleapis.com/v0/b/materi-fb.appspot.com/o/gallery%2F" + nama;
    let media = nm_db + "?alt=media"
    entry.url = media;
    entry.deskripsi = deskripsi;
    entry.nama = $(this).find('[id="nama"]').val();
    let Entry = firebase.database().ref('tb_gambar');
    Entry.push(entry).then(function (data) {
        window.location.href = ''
    });
    return false;
});
