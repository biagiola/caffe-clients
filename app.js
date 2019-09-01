const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

// bring up the data from firebase
db.collection('clientes').get().then( (snapshot) => {
    snapshot.docs.forEach( doc => {
        renderCafe(doc);
        console.log(doc.data().nombre);
    })
})

// create element and render cafe
function renderCafe(doc) {
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('span');
    
    li.setAttribute('id', doc.id);
    cross.setAttribute('id', doc.id);
    li.style.display = "none";
    
    name.textContent = doc.data().nombre + ' ';
    city.textContent = doc.data().ciudad;
    cross.textContent = 'x';
    cross.style.cursor = "pointer";
    
    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    cafeList.appendChild(li);   
    let a = document.getElementById(doc.id);
    $(a).hide().fadeIn(1000);
    

    // deleting data
    cross.addEventListener('click', (e) => {
        ul.li.style.animationPlayState = "running";
    });

    cross.addEventListener('click', (e) => {
        e.stopPropagation;
        let id = e.target.parentElement.getAttribute('id');
        db.collection('cafes').doc(id).delete();
    });
}

// saving data
form.addEventListener('submit', (event) => {
    event.preventDefault();
    db.collection('clientes').add({
        nombre: form.name.value,
        ciudad: form.city.value
    });
    //clean up again for charging
    form.name.value = '';
    form.city.value = '';
})

// real-time listener - update
// onSnapshot: cada vez que haya una actualización
/* db.collection('clientes').orderBy('ciudad').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    console.log(changes.docs);
    changes.forEach(change => {
        // console.log(changes.doc.data());
        if(change.type == 'added'){
            renderCafe(change.doc);
        } else if (change.type == 'removed') {
            let li = cafeList.querySelector('[id=' + change.doc.id + ']');
            cafeList.removeChild(li);
        }
    })
}) */

//getting data - snapshot recive data from collection
/*
db.collection('cafes').orderBy('name', 'desc').get().then( (snapshot) => {
   snapshot.docs.forEach( doc => {
       renderCafe(doc);
   } )
})*/
/*db.collection('cafes').get().then( (snapshot) => {
   snapshot.docs.forEach( doc => {
       renderCafe(doc);
   } )
})
db.collection('cafes').where('city', '==', 'luque').get().then( (snapshot) => {
   snapshot.docs.forEach( doc => {
       renderCafe(doc);
   } )
})*/


