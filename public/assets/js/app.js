//Dash Fade In
$(document).ready(function(){
  $("#dashboard-body").fadeIn(800);
  $("#dashboard-header").attr("max-height", "400");
});

// Snackbar
$('#snackbar').mouseenter(function(){
  $("#snackbar-hover").slideDown(600);
});

$('#snackbar').mouseleave(function(){
  $("#snackbar-hover").slideUp(600);
});

// Creates a Google Map centered in on SLC.
var map;
var infowindow;
var apiKey = 'AIzaSyCWVKhQawuJXf_PrAnh7orfwb2QjVqLFQU';
var centerlat = 40.761552;
var centerlng = -111.885752;
var theZoom = 13;
var theRadius = 13 * 300;



$('#search').on('click', function(){
  var position = $("#sign-up-section").offset().top;
  $('html, body').animate({
    scrollTop: position
  }, 1200, function(){
    $("#sign-up-section").fadeOut();
    $("#card-section").fadeOut();
    $(".coffee-wrapper").fadeIn(2000);
  });

    var address = $("#address-input").val().trim();

    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyB5EXA2BJmcchE6c3DQ0fFK7nyyja5i2co",
      "method": "POST"
    }

    $.ajax(settings).done(function (response) {
      centerlat = response.results[0].geometry.location.lat;
      centerlng = response.results[0].geometry.location.lng;
      $('#coffee-list').html("");
      initMap()

    });


  });

function initMap() {
        console.log();
  var place = {lat: centerlat, lng: centerlng};
  map = new google.maps.Map(document.getElementById('map'), {
    center: place,
    zoom: theZoom,
    styles: [
    {
        "featureType": "administrative.neighborhood",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#666666"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f2f1e4"
            },
            {
                "saturation": "-51"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f2f1e4"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.medical",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f1ced4"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#b9e4a6"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#dfdfdf"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "saturation": "0"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#dfdfdf"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#f4f4f4"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#dfdfdf"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#dfdfdf"
            }
        ]
    },
    {
        "featureType": "transit.station.airport",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#cfb2db"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#a0def9"
            }
        ]
    }
]
  });

  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: place,
    radius: theRadius,
    keyword: ['local', 'coffee', 'shops']
  }, callback);
}

function callback(results, status) {
  var openClose;

  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);

      $('#coffee-list').append(`<h3 id='${results[i].place_id}'>${results[i].name}</h3><p>Rating: ${results[i].rating} | ${openClose}</p>
        <p>${results[i].vicinity}</p>`);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    title: place.name,
    animation: google.maps.Animation.DROP
    });
    marker.addListener('click', function() {
         infowindow.open(map, marker);
       });

    google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(`<h3>${place.name}</h3><p>Rating: ${place.rating}<br />${place.vicinity}</p>`+
    `<div><img src="${place.photos[0].getUrl({ maxWidth: 150 })}"</div>
    `);
    infowindow.open(map, this);
    });

}

function changeCenter() {
    centerlng = map.getCenter().lng();
    centerlat = map.getCenter().lat();
    theZoom = map.getZoom();
}

function calibrateRadius() {
    theRadius = 591657550.5;

    for (var i = 1;i < theZoom;i++) {
        theRadius = theRadius / 2;
    }
}

// $(document).ready(function() {
//   boundListenerArray.push(google.maps.event.addListener(map, "bounds_changed", function() {
//       if (boundListenerArray.length > 1) {
//         google.maps.event.removeListener(
//           boundListenerArray[boundListenerArray.length - 1]
//         );
//       }

//       setTimeout(function() {
//         changeCenter();
//         // initMap();
//       }, 2000);
//     })
//   );
// });


/********* Refresh Search Button *********/
$('#refresh-button').on('click', () => {
    changeCenter();
    calibrateRadius();
    initMap();
    console.log(theRadius);
    console.log(theZoom);
})
