const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

// create element and render cafe
function renderCafe(doc) {
    // we create the elements
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('span');
    
    // add the unique id
    li.setAttribute('data-id', doc.id);
    
    // add the data in the span tag
    name.textContent = doc.data().nombre + ' ';
    city.textContent = doc.data().ciudad;
    cross.textContent = 'x';
    cross.style.cursor = "pointer";

    //append the span tags to the li tag
    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    // append the li tags to the ul tag
    cafeList.appendChild(li);   
    
    // add an effect to each li with jquery library
    let a = document.getElementById(doc.id);
    $(a).hide().fadeIn(1000);
    
    // deleting data
/*     cross.addEventListener('click', (e) => {
        ul.li.style.animationPlayState = "running";
    });  */
    cross.addEventListener('click', (e) => {
        e.stopPropagation;
        let id = e.target.parentElement.getAttribute('data-id'); // we get the id in the parent attribute
        db.collection('clientes').doc(id).delete();
    });
}

// getting data 
db.collection('clientes').get().then( (snapshot) => {
    snapshot.docs.forEach( doc => {
        renderCafe(doc);
        console.log(doc.data());
    })
})

// saving data
form.addEventListener('submit', (event) => {
    event.preventDefault(); // avoid to refresh the page while we look the db firestore
    db.collection('clientes').add({
        nombre: form.name.value,
        ciudad: form.city.value
    });
    //clean up again for charging again
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

/*

// Normal way to get data from db
db.collection('cafes').get().then( (snapshot) => {
   snapshot.docs.forEach( doc => {
       renderCafe(doc);
   } )
})

// Order the data retrieved from the db
db.collection('cafes').orderBy('name', 'desc').get().then( (snapshot) => {
   snapshot.docs.forEach( doc => {
       renderCafe(doc);
   } )
})

// Using where to filter some data
db.collection('cafes').where('city', '==', 'luque').get().then( (snapshot) => {
   snapshot.docs.forEach( doc => {
       renderCafe(doc);
   } )
})

*/


