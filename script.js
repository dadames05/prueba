window.onload = () => {
    let places = dynamicLoadPlaces();
    renderPlaces(places);
};


// to cennect this file with html tag
let x = document.getElementById("demo");
// to get gps coords from browser
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

// to hold coords
let myCoords = {}
// to write coords of html tag
function showPosition(position) {
    // re asign my coords on var
    myCoords.lat = position.coords.latitude
    myCoords.lng = position.coords.longitude
    // wrtite on html
    x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
}

// to pass coords and load places
function dynamicLoadPlaces() {
    return [
        {
            name: 'Magnemite',
            location: {
                lat: myCoords.lat,
                lng: myCoords.lng,
            }
        },
    ];
}

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        model.setAttribute('gltf-model', './assets/magnemite/scene.gltf');
        model.setAttribute('rotation', '0 180 0');
        model.setAttribute('animation-mixer', '');
        model.setAttribute('scale', '0.5 0.5 0.5');

        model.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });

        scene.appendChild(model);
    });
}
//button
<div class="centered">
    <button data-action="change"></button>
</div>

//3D models meta data
let models = [
    {
        url: './assets/magnemite/scene.gltf',
        scale: '0.5 0.5 0.5',
        info: 'Magnemite, Lv. 5, HP 10/10',
        rotation: '0 180 0',
    },
    {
        url: './assets/articuno/scene.gltf',
        scale: '0.2 0.2 0.2',
        rotation: '0 180 0',
        info: 'Articuno, Lv. 80, HP 100/100',
    },
    {
        url: './assets/dragonite/scene.gltf',
        scale: '0.08 0.08 0.08',
        rotation: '0 180 0',
        info: 'Dragonite, Lv. 99, HP 150/150',
    },
];


let modelIndex = 0
//to specify the right 
let setModel = function (model, entity) {

    //scale
    if (model.scale) {
        entity.setAttribute('scale', model.scale);
    }
//rotation
    if (model.rotation) {
        entity.setAttribute('rotation', model.rotation);
    }
//position
    if (model.position) {
        entity.setAttribute('position', model.position);
    }
//model url
    entity.setAttribute('gltf-model', model.url);
//innstructions to swapper button
    const div = document.querySelector('.instructions');
    div.innerText = model.info;
};


//to sett moodels parametters
function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {

        //coords
        let latitude = place.location.lat;
        let longitude = place.location.lng;
        
        //model attributes 
        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        //to specify the model 
        setModel(models[modelIndex], model);

        model.setAttribute('animation-mixer', '');

        //input from button (listener)
        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            var entity = document.querySelector('[gps-entity-place]');
            modelIndex++;
            var newIndex = modelIndex % models.length;
            setModel(models[newIndex], entity);
        });
// inject html tag 
        scene.appendChild(model);
    });
}
