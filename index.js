// Import stylesheets
import './style.css';

let userList = document.querySelector('#userList');
let form = document.querySelector('#addUser');

function renderUser(doc) {
    let li = document.createElement('li');
    let firstname = document.createElement('span');
    let lastname = document.createElement('span');
    let studentid = document.createElement('span');

    li.setAttribute('data-id', doc.id);
    firstname.textContent = doc.data().firstname;
    lastname.textContent = doc.data().lastname;
    studentid.textContent = doc.data().studentid;

    li.appendChild(firstname);
    li.appendChild(lastname);
    li.appendChild(studentid);

    userList.appendChild(li);
}



db.collection('users').get().then(user => {
    user.docs.forEach(doc => {
        console.log(doc.data())
        renderUser(doc);
    })
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('users').add({
        firstname: form.firstname.value,
        lastname: form.lastname.value,
        studentid: form.studentid.value,
    })
    form.firstname.value = '';
    form.lastname.value = '';
    form.studentid.value = '';
})


// Body element
const body = document.getElementById('body');

// Button elements
const btnSend = document.getElementById('btnSend');
const btnClose = document.getElementById('btnClose');
const btnShare = document.getElementById('btnShare');
const btnLogIn = document.getElementById('btnLogIn');
const btnLogOut = document.getElementById('btnLogOut');
const btnScanCode = document.getElementById('btnScanCode');
const btnOpenWindow = document.getElementById('btnOpenWindow');

// Profile elements
const email = document.getElementById('Email');
const userId = document.getElementById('userId');
const pictureUrl = document.getElementById('pictureUrl');
const displayName = document.getElementById('displayName');
const statusMessage = document.getElementById('statusMessage');

// QR element
const code = document.getElementById('code');
const friendShip = document.getElementById('friendShip');

async function main() {
  // Initialize LIFF app)
  switch (liff.getOS()) {
    case 'android':
      body.style.backgroundColor = '#d1f5d3';
      break;
    case 'ios':
      body.style.backgroundColor = '#eeeeee';
      break;
  }

  // Try a LIFF function
  await liff.init({liffId: '1656129299-PLzNKdpa' });

  if (!liff.isInClient()) {
    if (liff.isLoggedIn()) {
      btnLogIn.style.display = "none"
      btnLogOut.style.display = "block"
      getUserProfile()
    } else {
      btnLogIn.style.display = "block"
      btnLogOut.style.display = "none"
    }
  } else {
    getUserProfile()
  }
}
main();

async function getUserProfile() {
  const profile = await liff.getProfile();
  pictureUrl.src = profile.pictureUrl;
  userId.innerHTML = '<b>userId:</b> ' + profile.userId;
  statusMessage.innerHTML = '<b>statusMessage:</b> ' + profile.statusMessage;
  displayName.innerHTML = '<b>displayName:</b> ' + profile.displayName;
  email.innerHTML = '<b>email:</b> ' + liff.getDecodedIDToken().email;
}

btnLogIn.onclick = () => {
  liff.login()
}

btnLogOut.onclick = () => {
  liff.logout()
  window.location.reload()
}
