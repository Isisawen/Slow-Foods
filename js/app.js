/* Custom Javascript for this PhoneGap APP */
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    //Phonegap is ready
    console.log("Phonegap is ready");
}

$(document).on("mobileinit", function () {
    console.log("Initialize jQuery Mobile Phonegap Enhancement Configurations")
    // Make your jQuery Mobile framework configuration changes here!
    $.mobile.allowCrossDomainPages = true;
    $.support.cors = true;
    $.mobile.buttonMarkup.hoverDelay = 0;
    $.mobile.pushStateEnabled = false;
    $.mobile.defaultPageTransition = "none";
});

//{ "geo": { "$nearSphere": {"__type": "GeoPoint", "latitude": 30.0, "longitude": -20.0}}}
$.ajax({
    url: 'https://api.parse.com/1/classes/restaurants/',
    method: 'GET',
    dataType: 'json',
    headers: {
        'X-Parse-Application-Id': '6W64LqKgGiD8T5bh0ZS7hqipzy3uO4CZXEMHtJeG',
        'X-Parse-REST-API-Key': 'YNHIPKXWGsIBYyZXrshrZlVto8OyHzMrcHE30QD1'
    },
    success: function (data) {
        populateList(data.results);
        initialize(data.results);
    },
    error: function (err) {
        console.log('err', err)
    }

});

var geocoder = new google.maps.Geocoder();
var myLatlng = new google.maps.LatLng(38.568023, -121.436629);
var mapOptions = {
    zoom: 12,
    center: myLatlng
};
var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions),
    infowindow;

// $('body').on('click', '#search-btn', function (e) {
//     e.preventDefault(); 
//     var query = $('#search-text').val();
// console.log('query', query);                        //Search btn code for adding more cities
//     geocoder.geocode({
//         'address': query,
//          bounds: getGeoBounds()
//     }, function (results, status) {
//         console.log(results, status)
//         if (status == google.maps.GeocoderStatus.OK) {
//             map.setCenter(results[0].geometry.location);
//         } else {
//             console.log("Unable to find on map.");
//         }
//     });
// });

function initialize(data) {

    for (var i = 0; i < data.length; i++) {
        var markerLat = data[i]['geo']['latitude'];
        var markerLng = data[i]['geo']['longitude'];
        // console.log(data[i]);
        var counter = 50;

        var contentString = '<div class="list-wrapper">' +
            '<div class="img">' +
            '<img class="img-circle" src="http://placekitten.com/80/' + (counter + i) + '"/>' +
            '</div>' +
            '<div class="info">' +
            '<div class="name-info">' +
            '<p class="name">' + data[i].name + '</p>' +
            '<p class="address">' + data[i].address + '</p>' +
            '</div>' +
            '<div class="desc">' +
            '<p class="description">' + data[i].description + '</p>' +
            '<p class="meta"></p>' +
            '</div>' +
            '</div>' +
            '</div>';

        var mapMarkers = new google.maps.LatLng(markerLat, markerLng);
        var marker = new google.maps.Marker({
            position: mapMarkers,
            map: map,
            title: data[i].name
        });

        google.maps.event.addListener(marker, 'click', (function (marker, contentString) {
            return function () {
                if (infowindow) {
                    infowindow.close();
                } else {
                    infowindow = new google.maps.InfoWindow({
                        content: contentString
                    });
                }
                infowindow.setContent(contentString);
                infowindow.open(map, marker);
            };
        })(marker, contentString, infowindow));
    }
}

google.maps.event.addDomListener(window, 'load', initialize);


var populateList = function (data) {
    // console.log('data', data[0].name);
    var counter = 70;
    for (var i = 0; i < data.length; i++) {
        // console.log(data[i]);
        var myLatlng = new google.maps.LatLng(lat, lng);
        var lng = data[i]['geo']['longitude'];
        var lat = data[i]['geo']['latitude'];
        // console.log(lng+ " " + lat);
        var item = '<div class="list-wrapper">' +
            '<div class="img">' +
            '<img class="img-circle" src="http://placekitten.com/80/' + (counter + i) + '"/>' +
            '</div>' +
            '<div class="info">' +
            '<div class="name-info">' +
            '<p class="name">' + data[i].name + '</p>' +
            '<p class="address">' + data[i].address + '</p>' +
            '</div>' +
            '<div class="desc">' +
            '<p class="description">' + data[i].description + '</p>' +
            '<p class="meta"></p>' +
            '</div>' +
            '</div>' +
            '</div>';

        $('#restuarant-list').append('<li>' + item + '</li>');
    }
}
