const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('button');

const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezone = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');
let map = "";

btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);

function getData() {
    //проверка данных
    if (validatIp(ipInput.value)) {
        fetch(` https://geo.ipify.org/api/v2/country,city?apiKey=at_BZ21Wu18oTsoAEThdvSK1OKN1ckmS&ipAddress=${ipInput.value}`,
            { mode: 'cors', })
            .then(response => response.json())
            .then(setInfo)
    }
}
function handleKey(e) {
    if (e.key === 'Enter') {
        getData();
    }
}
function validatIp(ip) {
    if (/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|[0-9]{2}|[0-4][0-9]|25[0-5])$/.test(ip)) {
        return true;
    }

    alert('You have to enter a valid IP address');
    return false;
}
function setInfo(mapData) {
    console.log(mapData);
    ipInfo.innerText = mapData.ip;
    locationInfo.innerText = mapData.location.country + ' ' + mapData.location.region;
    timezone.innerText = mapData.location.timezone;
    ispInfo.innerText = mapData.isp;
    let center = [mapData.location.lat, mapData.location.lng];
    map.geoObjects.removeAll();
    map.setCenter(center, 11);   
    map.geoObjects
        .add(new ymaps.Placemark(center, {}, {}));
}
function init() {
    map = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 11,
        controls: [],
    });

    map.geoObjects
        .add(new ymaps.Placemark([55.76, 37.64], {}, {}));
};
ymaps.ready(init);