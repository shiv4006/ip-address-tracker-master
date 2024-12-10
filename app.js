var api_key = "at_2eBVcL0W6ik4BRGOrPlclZjT0F99Q";

var map = L.map('map');
var zoom = 13;

let inputIP = document.querySelector(".ip-address");
let buttonIP = document.querySelector(".submit-btn");
var ip = inputIP.value;

let txtIP = document.querySelector(".address-h3");
let txtLOC = document.querySelector(".location-h3");
let txtTZ = document.querySelector(".timezone-h3");
let txtISP = document.querySelector(".isp-h3");


$(function () { // Function from api website (idk wth is ajax or jquery but its good)
    $.ajax({ // When ip = "" , your actual localisation
        url: "https://geo.ipify.org/api/v1",
        data: {apiKey: api_key, ipAddress: ip},
        success: function(data) {
        //$("body").append("<pre>"+ JSON.stringify(data,"",2)+"</pre>");

        buttonIP.addEventListener("click", function get_data(e) { // when we click on button
            e.preventDefault();

            ip = inputIP.value;
            $.ajax({ // Look at ip value in input and load actual map
                url: "https://geo.ipify.org/api/v1",
                data: {apiKey: api_key, ipAddress: ip},
                success: function(data) {
                    //$("body").append("<pre>"+ JSON.stringify(data,"",2)+"</pre>");
                    // console.log(data);
                    let latitude = data.location.lat;
                    let longitude = data.location.lng;
                    let timeZone = "UTC"+data.location.timezone;

                    map.setView([latitude, longitude], zoom);
                    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { // Get map
                        maxZoom: 19,
                        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    }).addTo(map);

                    let blackIcon = L.icon({iconUrl: 'images/icon-location.svg'}); // Change marker
                    let marker = L.marker([latitude, longitude],{icon:blackIcon}).addTo(map);

                    txtIP.innerHTML = data.ip;
                    txtLOC.innerHTML = data.location.country+" "+data.location.region+", "+data.location.city;
                    txtTZ.innerHTML = "UTC"+data.location.timezone;
                    txtISP.innerHTML = data.isp;

                }
            });
            
        });
        
    }
    });
});


let m = document.querySelector("#map");
m.addEventListener('click', (e) => {
    m.style.zIndex = '4';
});