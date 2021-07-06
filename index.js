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