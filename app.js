const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

// create element and render cafe
function renderCafe(doc) {
    // we create the elements
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('span');
    
    // add the unique id to the li tag
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
    
    // deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation;
        let id = e.target.parentElement.getAttribute('data-id'); // we get the id in the parent attribute
        db.collection('clientes').doc(id).delete();
    });
}

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

// real-time listener - update; onSnapshot: cada vez que haya una actualización
db.collection('clientes').orderBy('ciudad').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    console.log('hola', changes.docs);
    changes.forEach(change => {
        // console.log(changes.doc.data());
        if(change.type == 'added'){
            renderCafe(change.doc);
        } else if (change.type == 'removed') {
            let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
            cafeList.removeChild(li);
        }
    })
})

/*

// Normal getting data - with out real time rendering
 db.collection('clientes').get().then( (snapshot) => {
    snapshot.docs.forEach( doc => {
        renderCafe(doc);
        console.log(doc.data());
    })
}) 

// Normal way to get data from db
db.collection('clientes').get().then( (snapshot) => {
   snapshot.docs.forEach( doc => {
       renderCafe(doc);
   } )
})

// Order the data retrieved from the db
db.collection('clientes').orderBy('name', 'desc').get().then( (snapshot) => {
   snapshot.docs.forEach( doc => {
       renderCafe(doc);
   } )
})

// Using where to filter some data
db.collection('clientes').where('city', '==', 'luque').get().then( (snapshot) => {
   snapshot.docs.forEach( doc => {
       renderCafe(doc);
   } )
})

//- Updating data
// overwrite just the property that we specifys
db.collection('clientes).doc(<idElement>).update({
    name: 'new name'
})

// overwrite everything and becouse there's no city proporty, it leave empty
db.collection('clientes).doc(<idElement>).set({
    name: 'new name'
})
    
    // in this case is equal to update()
    db.collection('clientes).doc(<idElement>).set({
      name: 'new name',
      city: 'liverpool'
    })

*/


