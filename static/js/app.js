var map, featureList, boroughSearch = [], theaterSearch = [], museumSearch = [];
let latlon = []
let markerArray = []
let popup = []
let incidentType = []

map = L.map("map", {
  center: [29.8204, -95.3298],
  zoom: 10
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: "pk.eyJ1IjoiYW5kZXJzamgiLCJhIjoiY2sxODNlMDBzMDZ6cTNvcDFwZTh0eGJnNyJ9.UOYs4mSt5CSEuifzIxu1tA"
}).addTo(map);

// /* Basemap Layers */
var streetMap= L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: "pk.eyJ1IjoiYW5kZXJzamgiLCJhIjoiY2sxODNlMDBzMDZ6cTNvcDFwZTh0eGJnNyJ9.UOYs4mSt5CSEuifzIxu1tA"
});
var satellite = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.satellite",
  accessToken: "pk.eyJ1IjoiYW5kZXJzamgiLCJhIjoiY2sxODNlMDBzMDZ6cTNvcDFwZTh0eGJnNyJ9.UOYs4mSt5CSEuifzIxu1tA"
});

var baseLayers = {
  "Street Map": streetMap,
  "Aerial Imagery": satellite
};

// var layerControl = L.control.groupedLayers(baseLayers,  {
//   collapsed: isCollapsed
// }).addTo(map);


$(window).resize(function() {
  sizeLayerControl();
});

// $(document).on("click", ".feature-row", function(e) {
//   $(document).off("mouseout", ".feature-row", clearHighlight);
//   sidebarClick(parseInt($(this).attr("id"), 10));
// });

// if ( !("ontouchstart" in window) ) {
//   $(document).on("mouseover", ".feature-row", function(e) {
//     highlight.clearLayers().addLayer(L.circleMarker([$(this).attr("lat"), $(this).attr("lng")], highlightStyle));
//   });
// }

// $(document).on("mouseout", ".feature-row", clearHighlight);

$("#about-btn").click(function() {
  $("#aboutModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});




$("#legend-btn").click(function() {
  $("#legendModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

// $("#login-btn").click(function() {
//   $("#loginModal").modal("show");
//   $(".navbar-collapse.in").collapse("hide");
//   return false;
// });

$("#list-btn").click(function() {
  animateSidebar();
  return false;
});

$("#nav-btn").click(function() {
  $(".navbar-collapse").collapse("toggle");
  return false;
});

$("#sidebar-toggle-btn").click(function() {
  animateSidebar();
  return false;
});

$("#sidebar-hide-btn").click(function() {
  animateSidebar();
  return false;
});

function animateSidebar() {
  $("#sidebar").animate({
    width: "toggle"
  }, 350, function() {
    map.invalidateSize();
  });
}

function sizeLayerControl() {
  $(".leaflet-control-layers").css("max-height", $("#map").height() - 50);
}

// function clearHighlight() {
//   highlight.clearLayers();
// }

function sidebarClick(id) {
  var layer = markerClusters.getLayer(id);
  map.setView([layer.getLatLng().lat, layer.getLatLng().lng], 17);
  layer.fire("click");
  /* Hide sidebar and go to the map on small screens */
  if (document.body.clientWidth <= 767) {
    $("#sidebar").hide();
    map.invalidateSize();
  }
}

  var incidents = [ {
      location: [29.61469,-95.217551],
      time: "10/16/2019 13:47",
      type:"TRAFFIC HAZARD/NON URGENT",
      address: "11400 FUQUA ST"
  },
          {
      location: [29.788847,-95.465122],
      time: "10/16/2019 14:40",
      type:"CRASH/MAJOR/NON FATAL",
      address: "1118 SILBER RD"
  },
          {
      location: [29.705745,-95.455469],
      time: "10/16/2019 13:47",
      type:"TRAFFIC HAZARD/NON URGENT",
      address: "7500 BELLAIRE BLVD"
  },
          {
      location: [29.871031,-95.351936],
      time: "10/16/2019 13:13",
      type:"TRAFFIC HAZARD/NON URGENT",
      address: "19798 ALDINE WESTFIELD RD"
  },
  {
      location: [29.8414568627451,-95.4991699019608],
      time: "10/16/2019 12:38",
      type:"CRASH/MAJOR/NON FATAL",
      address: "13098 COOPERS HAWK DR"
  },
  {
      location: [29.856015,-95.472975],
      time: "October 14, 2019",
      type:"Shooting",
      address: "704 Greens Road",
  },
  {
      location: [29.693009,-95.496706],
      time: "October 14, 2019",
      type:"Sexual Assault",
      address: "11303 Bissonnet Street",
  },
    {
    location: [29.61469,-95.217551],
    time: "10/10/2019 23:05",
    type:"TRAFFIC HAZARD/NON URGENT",
    address: "11400 FUQUA ST"
  },
  {
    location: [29.8414568627451,-95.4991699019608],
    time: "10/10/2019 22:38",
    type:"CRASH/MAJOR/NON FATAL",
    address: "13098 COOPERS HAWK DR"
  },
    {
    location: [29.790866,-95.549237],
    time: "10/10/2019 22:38",
    type:"CRASH/MINOR",
    address: "20698 ALDINE WESTFIELD RD"
  },
  {
    location: [29.6053344,-95.4772572],
    time: "10/10/2019 22:31",
    type:"CRASH/MAJOR/NON FATAL",
    address: "7200 PINEMONT DR"
  },
  {
    location: [29.613215,-95.445998],
    time: "10/10/2019 22:30",
    type:"SHOOTING",
    address: "10200 WESTVIEW DR"
  }
];

  /* Add Live crime incidents to the Sidebar and the map*/
  $("#feature-list tbody").empty();
  /* Loop through theaters layer and add only features which are in the map bounds */
  incidents.forEach(function (incident, i) {

        let type = "";
        latlon.push(incident.location)
        //$('.list-group').httml = ""
        incidentType.push(incident.type)
        var iconurl = "";

        if(incident.type.startsWith("CRASH")){
            $("#feature-list tbody").append('<tr class="feature-row" id="'+ i + 'lat="' + incident.location[0] + '" lng="' + incident.location[1]+ '"><td style="vertical-align: middle;"><img width="22" height="22" src="../static/img/icons8-car-100v2.png"></td><td class="feature-name">' + incident.address );
            iconurl = "../static/img/icons8-car-100v2.png";
        } else if(incident.type.startsWith("TRAFFIC")){
            $("#feature-list tbody").append('<tr class="feature-row" id="'+ i + 'lat="' + incident.location[0] + '" lng="' + incident.location[1]+ '"><td style="vertical-align: middle;"><img width="22" height="22" src="../static/img/icons8-under-construction-64.png"></td><td class="feature-name">' + incident.address );
            iconurl = "../static/img/icons8-under-construction-64.png";
        } else{
            $("#feature-list tbody").append('<tr class="feature-row" id="'+ i + 'lat="' + incident.location[0] + '" lng="' + incident.location[1]+ '"><td style="vertical-align: middle;"><img width="22" height="22" src="../static/img/icons8-handcuffs-50.png"></td><td class="feature-name">' + incident.address );
            iconurl = "../static/img/icons8-handcuffs-50.png";
        }
        var icon = new L.Icon({
          iconUrl: iconurl,
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [32, 32],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [37, 37]
         });  
        L.marker(incident.location, {icon: icon})
         .bindPopup("<h3>" + incident.type + "</h3>   <hr><h4>" + incident.address.toUpperCase() + "</h4> <hr> <h4>" + incident.time + "</h4>")
         .addTo(map);
       popup.push("<h3>" + incident.type + "</h3> <hr> <h4>" + incident.address.toUpperCase() + "</h4> <hr> <h4>" + incident.time + "</h4>");
       markerArray.push(L.marker(incident.location))

    });

    let markerActive;


    $('.feature-row').bind('mouseover',function(){
      console.log("Event clicked")
      var index = $( ".feature-row" ).index( this );
      console.log(index)
      latlang = markerArray[index].getLatLng()
      // var numMarker = L.ExtraMarkers.icon({
      //   icon: 'fa-number',
      //   number: index,
      //   markerColor: 'yellow'
      //   }); icons8-car-100hover.png
      if(incidentType[index].startsWith("CRASH")){

      var iconHover = new L.Icon({
        iconUrl: '../static/img/icons8-car-100v2hover.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [32, 32],
        iconAnchor: [11, 41],
        popupAnchor: [1, -34],
        shadowSize: [46, 46],
       });  

    }else if(incidentType[index].startsWith("TRAFFIC")){
      var iconHover = new L.Icon({
        iconUrl: '../static/img/icons8-under-construction-64hover.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [32, 32],
        iconAnchor: [11, 41],
        popupAnchor: [1, -34],
        shadowSize: [46, 46],
       });  
    } else{
      var iconHover = new L.Icon({
        iconUrl: '../static/img/icons8-handcuffs-50hover.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [32, 32],
        iconAnchor: [11, 41],
        popupAnchor: [1, -34],
        shadowSize: [46, 46],

      });
    }
    markerActive = new L.Marker(latlang, {icon: iconHover});
    map.addLayer(markerActive);
    map.panTo(latlang);
    markerActive.bindPopup(popup[index]).openPopup();

  

      });
      $('.feature-row').bind('mouseout',function(){
        console.log("Event unclicked")
        console.log("Marker active")
        console.log(markerActive)
        var index = $( "a" ).index( this );
        map.removeLayer(markerActive)
        });

/* Search for the incident table for a keyword(particular address or street) */
var $rows = $('.table tr');
$('.form-control').keyup(function() {
    
    var val = '^(?=.*\\b' + $.trim($(this).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
        reg = RegExp(val, 'i'),
        text;
    
    $rows.show().filter(function() {
        text = $(this).text().replace(/\s+/g, ' ');
        return !reg.test(text);
    }).hide();
});

// SHow entire map window with markers
$("#full-extent-btn").click(function() {
  var group = new L.featureGroup(markerArray);
  map.fitBounds(group.getBounds());
  $(".navbar-collapse.in").collapse("hide");
  return false;
});


// function syncSidebar() {
//   /* Empty sidebar features */
  // $("#feature-list tbody").empty();
  // /* Loop through theaters layer and add only features which are in the map bounds */
  // theaters.eachLayer(function (layer) {
  //   if (map.hasLayer(theaterLayer)) {
  //     if (map.getBounds().contains(layer.getLatLng())) {
  //       $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/theater.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
  //     }
  //   }
  // });
//   /* Loop through museums layer and add only features which are in the map bounds */
//   museums.eachLayer(function (layer) {
//     if (map.hasLayer(museumLayer)) {
//       if (map.getBounds().contains(layer.getLatLng())) {
//         $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/museum.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
//       }
//     }
//   });
//   /* Update list.js featureList */
//   featureList = new List("features", {
//     valueNames: ["feature-name"]
//   });
//   featureList.sort("feature-name", {
//     order: "asc"
//   });
// }


// /* Overlay Layers */
// var highlight = L.geoJson(null);
// var highlightStyle = {
//   stroke: false,
//   fillColor: "#00FFFF",
//   fillOpacity: 0.7,
//   radius: 10
// };

// var boroughs = L.geoJson(null, {
//   style: function (feature) {
//     return {
//       color: "black",
//       fill: false,
//       opacity: 1,
//       clickable: false
//     };
//   },
//   onEachFeature: function (feature, layer) {
//     boroughSearch.push({
//       name: layer.feature.properties.BoroName,
//       source: "Boroughs",
//       id: L.stamp(layer),
//       bounds: layer.getBounds()
//     });
//   }
// });
// $.getJSON("data/boroughs.geojson", function (data) {
//   boroughs.addData(data);
// });

// //Create a color dictionary based off of subway route_id
// var subwayColors = {"1":"#ff3135", "2":"#ff3135", "3":"ff3135", "4":"#009b2e",
//     "5":"#009b2e", "6":"#009b2e", "7":"#ce06cb", "A":"#fd9a00", "C":"#fd9a00",
//     "E":"#fd9a00", "SI":"#fd9a00","H":"#fd9a00", "Air":"#ffff00", "B":"#ffff00",
//     "D":"#ffff00", "F":"#ffff00", "M":"#ffff00", "G":"#9ace00", "FS":"#6e6e6e",
//     "GS":"#6e6e6e", "J":"#976900", "Z":"#976900", "L":"#969696", "N":"#ffff00",
//     "Q":"#ffff00", "R":"#ffff00" };

// var subwayLines = L.geoJson(null, {
//   style: function (feature) {
//       return {
//         color: subwayColors[feature.properties.route_id],
//         weight: 3,
//         opacity: 1
//       };
//   },
//   onEachFeature: function (feature, layer) {
//     if (feature.properties) {
//       var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Division</th><td>" + feature.properties.Division + "</td></tr>" + "<tr><th>Line</th><td>" + feature.properties.Line + "</td></tr>" + "<table>";
//       layer.on({
//         click: function (e) {
//           $("#feature-title").html(feature.properties.Line);
//           $("#feature-info").html(content);
//           $("#featureModal").modal("show");

//         }
//       });
//     }
//     layer.on({
//       mouseover: function (e) {
//         var layer = e.target;
//         layer.setStyle({
//           weight: 3,
//           color: "#00FFFF",
//           opacity: 1
//         });
//         if (!L.Browser.ie && !L.Browser.opera) {
//           layer.bringToFront();
//         }
//       },
//       mouseout: function (e) {
//         subwayLines.resetStyle(e.target);
//       }
//     });
//   }
// });
// $.getJSON("data/subways.geojson", function (data) {
//   subwayLines.addData(data);
// });

// /* Single marker cluster layer to hold all clusters */
var markerClusters = new L.MarkerClusterGroup({
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: false,
  zoomToBoundsOnClick: true,
  disableClusteringAtZoom: 16
});

// /* Empty layer placeholder to add to layer control for listening when to add/remove theaters to markerClusters layer */
// var theaterLayer = L.geoJson(null);
// var theaters = L.geoJson(null, {
//   pointToLayer: function (feature, latlng) {
//     return L.marker(latlng, {
//       icon: L.icon({
//         iconUrl: "assets/img/theater.png",
//         iconSize: [24, 28],
//         iconAnchor: [12, 28],
//         popupAnchor: [0, -25]
//       }),
//       title: feature.properties.NAME,
//       riseOnHover: true
//     });
//   },
//   onEachFeature: function (feature, layer) {
//     if (feature.properties) {
//       var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Name</th><td>" + feature.properties.NAME + "</td></tr>" + "<tr><th>Phone</th><td>" + feature.properties.TEL + "</td></tr>" + "<tr><th>Address</th><td>" + feature.properties.ADDRESS1 + "</td></tr>" + "<tr><th>Website</th><td><a class='url-break' href='" + feature.properties.URL + "' target='_blank'>" + feature.properties.URL + "</a></td></tr>" + "<table>";
//       layer.on({
//         click: function (e) {
//           $("#feature-title").html(feature.properties.NAME);
//           $("#feature-info").html(content);
//           $("#featureModal").modal("show");
//           highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
//         }
//       });
//       $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/theater.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
//       theaterSearch.push({
//         name: layer.feature.properties.NAME,
//         address: layer.feature.properties.ADDRESS1,
//         source: "Theaters",
//         id: L.stamp(layer),
//         lat: layer.feature.geometry.coordinates[1],
//         lng: layer.feature.geometry.coordinates[0]
//       });
//     }
//   }
// });
// $.getJSON("data/DOITT_THEATER_01_13SEPT2010.geojson", function (data) {
//   theaters.addData(data);
//   map.addLayer(theaterLayer);
// });

// /* Empty layer placeholder to add to layer control for listening when to add/remove museums to markerClusters layer */
// var museumLayer = L.geoJson(null);
// var museums = L.geoJson(null, {
//   pointToLayer: function (feature, latlng) {
//     return L.marker(latlng, {
//       icon: L.icon({
//         iconUrl: "assets/img/museum.png",
//         iconSize: [24, 28],
//         iconAnchor: [12, 28],
//         popupAnchor: [0, -25]
//       }),
//       title: feature.properties.NAME,
//       riseOnHover: true
//     });
//   },
//   onEachFeature: function (feature, layer) {
//     if (feature.properties) {
//       var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Name</th><td>" + feature.properties.NAME + "</td></tr>" + "<tr><th>Phone</th><td>" + feature.properties.TEL + "</td></tr>" + "<tr><th>Address</th><td>" + feature.properties.ADRESS1 + "</td></tr>" + "<tr><th>Website</th><td><a class='url-break' href='" + feature.properties.URL + "' target='_blank'>" + feature.properties.URL + "</a></td></tr>" + "<table>";
//       layer.on({
//         click: function (e) {
//           $("#feature-title").html(feature.properties.NAME);
//           $("#feature-info").html(content);
//           $("#featureModal").modal("show");
//           highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
//         }
//       });
//       $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/museum.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
//       museumSearch.push({
//         name: layer.feature.properties.NAME,
//         address: layer.feature.properties.ADRESS1,
//         source: "Museums",
//         id: L.stamp(layer),
//         lat: layer.feature.geometry.coordinates[1],
//         lng: layer.feature.geometry.coordinates[0]
//       });
//     }
//   }
// });
// $.getJSON("data/DOITT_MUSEUM_01_13SEPT2010.geojson", function (data) {
//   museums.addData(data);
// });

// map = L.map("map", {
//   zoom: 10,
//   center: [40.702222, -73.979378],
//   layers: [cartoLight, boroughs, markerClusters, highlight],
//   zoomControl: false,
//   attributionControl: false
// });

// /* Layer control listeners that allow for a single markerClusters layer */
// map.on("overlayadd", function(e) {
//   if (e.layer === theaterLayer) {
//     markerClusters.addLayer(theaters);
//     syncSidebar();
//   }
//   if (e.layer === museumLayer) {
//     markerClusters.addLayer(museums);
//     syncSidebar();
//   }
// });

// map.on("overlayremove", function(e) {
//   if (e.layer === theaterLayer) {
//     markerClusters.removeLayer(theaters);
//     syncSidebar();
//   }
//   if (e.layer === museumLayer) {
//     markerClusters.removeLayer(museums);
//     syncSidebar();
//   }
// });

// /* Filter sidebar feature list to only show features in current map bounds */
// map.on("moveend", function (e) {
//   syncSidebar();
// });

// /* Clear feature highlight when map is clicked */
// map.on("click", function(e) {
//   highlight.clearLayers();
// });

// /* Attribution control */
// function updateAttribution(e) {
//   $.each(map._layers, function(index, layer) {
//     if (layer.getAttribution) {
//       $("#attribution").html((layer.getAttribution()));
//     }
//   });
// }
// map.on("layeradd", updateAttribution);
// map.on("layerremove", updateAttribution);

// var attributionControl = L.control({
//   position: "bottomright"
// });
// attributionControl.onAdd = function (map) {
//   var div = L.DomUtil.create("div", "leaflet-control-attribution");
//   div.innerHTML = "<span class='hidden-xs'>Developed by <a href='http://bryanmcbride.com'>bryanmcbride.com</a> | </span><a href='#' onclick='$(\"#attributionModal\").modal(\"show\"); return false;'>Attribution</a>";
//   return div;
// };
// map.addControl(attributionControl);

var zoomControl = L.control.zoom({
  position: "bottomright"
}).addTo(map);

// /* GPS enabled geolocation control set to follow the user's location */
var locateControl = L.control.locate({
  position: "bottomright",
  drawCircle: true,
  follow: true,
  setView: true,
  keepCurrentZoomLevel: true,
  markerStyle: {
    weight: 2,
    opacity: 0.7,
    fillOpacity: 0.8
  },
  circleStyle: {
    weight: 2,
    clickable: false
  },
  icon: "fa fa-location-arrow",
  metric: false,
  strings: {
    title: "My location",
    popup: "Your location is within {distance} {unit} from this point",
    outsideMapBoundsMsg: "You seem located outside the boundaries of the map"
  },
  locateOptions: {
    maxZoom: 18,
    watch: true,
    enableHighAccuracy: true,
    maximumAge: 10000,
    timeout: 10000
  }
}).addTo(map);

// /* Larger screens get expanded layer control and visible sidebar */
if (document.body.clientWidth <= 767) {
  var isCollapsed = true;
} else {
  var isCollapsed = false;
}




// var groupedOverlays = {
//   "Points of Interest": {
//     "<img src='assets/img/theater.png' width='24' height='28'>&nbsp;Theaters": theaterLayer,
//     "<img src='assets/img/museum.png' width='24' height='28'>&nbsp;Museums": museumLayer
//   },
//   "Reference": {
//     "Boroughs": boroughs,
//     "Subway Lines": subwayLines
//   }
// };

// var layerControl = L.control.groupedLayers(baseLayers, groupedOverlays, {
//   collapsed: isCollapsed
// }).addTo(map);


// /* Highlight search box text on click */
// $("#searchbox").click(function () {
//   $(this).select();
// });

/* Prevent hitting enter from refreshing the page */
// $("#searchbox").keypress(function (e) {
//   if (e.which == 13) {
//     e.preventDefault();
//   }
// });

$("#featureModal").on("hidden.bs.modal", function (e) {
  $(document).on("mouseout", ".feature-row", clearHighlight);
});

// /* Typeahead search functionality */
// $(document).one("ajaxStop", function () {
//   $("#loading").hide();
//   sizeLayerControl();
//   /* Fit map to boroughs bounds */
//   map.fitBounds(boroughs.getBounds());
//   featureList = new List("features", {valueNames: ["feature-name"]});
//   featureList.sort("feature-name", {order:"asc"});

//   var boroughsBH = new Bloodhound({
//     name: "Boroughs",
//     datumTokenizer: function (d) {
//       return Bloodhound.tokenizers.whitespace(d.name);
//     },
//     queryTokenizer: Bloodhound.tokenizers.whitespace,
//     local: boroughSearch,
//     limit: 10
//   });

//   var theatersBH = new Bloodhound({
//     name: "Theaters",
//     datumTokenizer: function (d) {
//       return Bloodhound.tokenizers.whitespace(d.name);
//     },
//     queryTokenizer: Bloodhound.tokenizers.whitespace,
//     local: theaterSearch,
//     limit: 10
//   });

//   var museumsBH = new Bloodhound({
//     name: "Museums",
//     datumTokenizer: function (d) {
//       return Bloodhound.tokenizers.whitespace(d.name);
//     },
//     queryTokenizer: Bloodhound.tokenizers.whitespace,
//     local: museumSearch,
//     limit: 10
//   });

//   var geonamesBH = new Bloodhound({
//     name: "GeoNames",
//     datumTokenizer: function (d) {
//       return Bloodhound.tokenizers.whitespace(d.name);
//     },
//     queryTokenizer: Bloodhound.tokenizers.whitespace,
//     remote: {
//       url: "http://api.geonames.org/searchJSON?username=bootleaf&featureClass=P&maxRows=5&countryCode=US&name_startsWith=%QUERY",
//       filter: function (data) {
//         return $.map(data.geonames, function (result) {
//           return {
//             name: result.name + ", " + result.adminCode1,
//             lat: result.lat,
//             lng: result.lng,
//             source: "GeoNames"
//           };
//         });
//       },
//       ajax: {
//         beforeSend: function (jqXhr, settings) {
//           settings.url += "&east=" + map.getBounds().getEast() + "&west=" + map.getBounds().getWest() + "&north=" + map.getBounds().getNorth() + "&south=" + map.getBounds().getSouth();
//           $("#searchicon").removeClass("fa-search").addClass("fa-refresh fa-spin");
//         },
//         complete: function (jqXHR, status) {
//           $('#searchicon').removeClass("fa-refresh fa-spin").addClass("fa-search");
//         }
//       }
//     },
//     limit: 10
//   });
//   boroughsBH.initialize();
//   theatersBH.initialize();
//   museumsBH.initialize();
//   geonamesBH.initialize();

//   /* instantiate the typeahead UI */
//   $("#searchbox").typeahead({
//     minLength: 3,
//     highlight: true,
//     hint: false
//   }, {
//     name: "Boroughs",
//     displayKey: "name",
//     source: boroughsBH.ttAdapter(),
//     templates: {
//       header: "<h4 class='typeahead-header'>Boroughs</h4>"
//     }
//   }, {
//     name: "Theaters",
//     displayKey: "name",
//     source: theatersBH.ttAdapter(),
//     templates: {
//       header: "<h4 class='typeahead-header'><img src='assets/img/theater.png' width='24' height='28'>&nbsp;Theaters</h4>",
//       suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
//     }
//   }, {
//     name: "Museums",
//     displayKey: "name",
//     source: museumsBH.ttAdapter(),
//     templates: {
//       header: "<h4 class='typeahead-header'><img src='assets/img/museum.png' width='24' height='28'>&nbsp;Museums</h4>",
//       suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
//     }
//   }, {
//     name: "GeoNames",
//     displayKey: "name",
//     source: geonamesBH.ttAdapter(),
//     templates: {
//       header: "<h4 class='typeahead-header'><img src='assets/img/globe.png' width='25' height='25'>&nbsp;GeoNames</h4>"
//     }
//   }).on("typeahead:selected", function (obj, datum) {
//     if (datum.source === "Boroughs") {
//       map.fitBounds(datum.bounds);
//     }
//     if (datum.source === "Theaters") {
//       if (!map.hasLayer(theaterLayer)) {
//         map.addLayer(theaterLayer);
//       }
//       map.setView([datum.lat, datum.lng], 17);
//       if (map._layers[datum.id]) {
//         map._layers[datum.id].fire("click");
//       }
//     }
//     if (datum.source === "Museums") {
//       if (!map.hasLayer(museumLayer)) {
//         map.addLayer(museumLayer);
//       }
//       map.setView([datum.lat, datum.lng], 17);
//       if (map._layers[datum.id]) {
//         map._layers[datum.id].fire("click");
//       }
//     }
//     if (datum.source === "GeoNames") {
//       map.setView([datum.lat, datum.lng], 14);
//     }
//     if ($(".navbar-collapse").height() > 50) {
//       $(".navbar-collapse").collapse("hide");
//     }
//   }).on("typeahead:opened", function () {
//     $(".navbar-collapse.in").css("max-height", $(document).height() - $(".navbar-header").height());
//     $(".navbar-collapse.in").css("height", $(document).height() - $(".navbar-header").height());
//   }).on("typeahead:closed", function () {
//     $(".navbar-collapse.in").css("max-height", "");
//     $(".navbar-collapse.in").css("height", "");
//   });
//   $(".twitter-typeahead").css("position", "static");
//   $(".twitter-typeahead").css("display", "block");
// });

// Leaflet patch to make layer control scrollable on touch browsers
// var container = $(".leaflet-control-layers")[0];
// if (!L.Browser.touch) {
//   L.DomEvent
//   .disableClickPropagation(container)
//   .disableScrollPropagation(container);
// } else {
//   L.DomEvent.disableClickPropagation(container);
// }


var stations = [
  {
    stationName: "Bush IAH Airport", 
    location: [29.987264528300944, -95.34582612004576], 
    address: "3100 Terminal Road North", 
    legend: "Airport-IAH Division - Districts 21 - 3100 Terminal Rd. North - (281) 230-6800"
  }, 
  {
    stationName: "Central", 
    location: [29.764874534712266, -95.3707253452462], 
    address: "61 Riesner St", 
    legend: "Central Division - Districts 1 & 2 - 61 Riesner St. - (713) 247-440"
  },
  {
    stationName: "Central", 
    location: [29.764874534712266, -95.3707253452462], 
    address: "61 Riesner St", 
    legend: "Central Division - Districts 1 & 2 - 61 Riesner St. - (713) 247-440"
  },

  {
    stationName: "Clear Lake", 
    location: [29.57953957534573, -95.10646398910244], 
    address: "2855 Bay Area Blvd", 
    legend: "Clear Lake Division - District 12 - 2855 Bay Area Blvd. - (832) 395-1777"
  },

  {
    stationName: "Downtown", 
    location: [29.7537251915145, -95.35601230351529], 
    address: "1900 Rusk St", 
    legend: "Downtown Division - Beat 1A10 -  1900 Rusk - (832) 394-0000"
  },

  {
    stationName: "Eastside", 
    location: [29.73430910602781, -95.29004563881392], 
    address: "7525 Sherman", 
    legend: "Eastside Division - District 11 - 7525 Sherman - (832) 395-1580"
  },

  {
    stationName: "Kingwood", 
    location: [30.05463728306788, -95.18825960279793], 
    address: "3915 Rustic Woods Dr", 
    legend: "Kingwood Division - District 24 - 3915 Rustic Wood Dr. - (832) 395-1800"
  },

  {
    stationName: "Midwest", 
    location: [29.71667641699483, -95.51153144965537], 
    address: "7277 Regency Square Blvd", 
    legend: "Midwest Division - District 18 - 7277 Regency Square Blvd - (832) 394-1200"
  },

  {
    stationName: "North", 
    location: [29.879534160445672, -95.4469385491213], 
    address: "9455 W Montgomery Rd", 
    legend: "North Division - Districts 3 & 6 - 9455 W. Montgomery - (832) 394 -3800"
  },

  {
    stationName: "North Belt",
    location: [29.95147068350088, -95.4199241978885], 
    address: "100 Glenborough Dr", 
    legend: "North Belt Division - District 22 - 100 Glenborough Dr - (832) 394-4900"
  },

  {
    stationName: "Northeast", 
    location: [29.83226408342705, -95.27337679363981], 
    address: "8301 Ley Rd", 
    legend: "Northeast Division - Districts 7,  8, & 9 - 8301 Ley Rd. - (832) 395-1500"
  },

  {
    stationName: "Northwest", 
    location: [29.857041766092586, -95.5398015093995], 
    address: "6000 Teague Road", 
    legend: "Northwest Division - Districts 4 & 5 - 6000 Teague Rd. - (832) 394-5500"
  },

  {
    stationName: "Police Headquarters", 
    location: [29.755772339900112, -95.36751369860828], 
    address: "1200 Travis St", 
    legend: "Police Headquarters - 1200 Travis - (713) 308-1200"
  },

  {
    stationName: "South Central", 
    location: [29.742877655942078, -95.3628099860077], 
    address: "2202 St. Emanuel", 
    legend: "South Central Division - District 10 - 2202 St. Emanuel - (832) 394-0300"
  },

  {
    stationName: "South Gessner", 
    location: [29.649543810405692, -95.52840400465658], 
    address: "8605 Westplace Dr", 
    legend: "South Gessner Division - District 17 - 8605 West Place Dr. - (832) 394-4700"
  },

  {
    stationName: "Southeast", 
    location: [29.657384448022874, -95.3168111128208], 
    address: "8300 Mykawa", 
    legend: "Southeast Division - Districts 13 & 14 - 8300 Mykawa - (832) 394-1600"
  },

  {
    stationName: "Southwest", 
    location: [29.63704163472314, -95.45711234272345], 
    address: "13097 Nitida St", 
    legend: "Southwest Division - Districts 15 & 16 - 13097 Nitida St.  - (832) 394-0400"
  },

  {
    stationName: "Westside", 
    location: [29.727476147598914, -95.60486678242556], 
    address: "3203 S Dairy Ashford", 
    legend: "Westside Division - Districts 19 & 20 - 3203 S. Dairy Ashford - (832) 394-5600"
  },

  {
    stationName: "William P. Hobby Airport", 
    location: [29.65408531758694, -95.27665426232514], 
    address: "7800 Airport Blvd", 
    legend: "Airport-Hobby Division - Districts 23 - 7800 Airport Blvd - (713) 845-6800"
  }
];


for (var i = 0; i < stations.length; i++) {
  var station = stations[i];
  var policeWomanIcon = new L.Icon({
   iconUrl: '../static/img/icons8-policeman-female-40.png',
   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
   iconSize: [30, 30],
   iconAnchor: [12, 41],
   popupAnchor: [1, -34],
   shadowSize: [35, 35]
  });  
  console.log(station.location)
  L.marker(station.location, {icon: policeWomanIcon}) 
    .bindPopup("<h1>" + station.stationName + "</h1> <hr> <h4>Address & Info - </h4><p>" + station.legend + "</p>")
    .addTo(map);
}

// Live  Incident blink indicator
(function blink() {
  $('.blink_me').fadeOut(700).fadeIn(700, blink);
})();
//blink_me();