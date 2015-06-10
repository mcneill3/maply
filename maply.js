var options = {
  center: { lat: 37.457122, lng: -122.185351 },
  zoom: 18,
  mapTypeId: google.maps.MapTypeId.HYBRID
};
var map = new google.maps.Map($('#map')[0], options);
var bounds = new google.maps.LatLngBounds();

$('#geocoder').submit(function(e){
  e.preventDefault();
  var address = $('#address').val(); $.get('https://maps.googleapis.com/maps/api/geocode/json?address='+address)
  .success(function(data){
    // get location object from API
    var location = data.results[0].geometry.location;

    // center the map on the new location
    map.setOptions({ center: { lat: location.lat, lng: location.lng }});

    // drop a marker on those coordinates
    var coords = new google.maps.LatLng(location.lat, location.lng);
    new google.maps.Marker({ map: map, position: coords });

    // fit all markers on the map
    bounds.extend(coords);
    map.fitBounds(bounds);

    // zoom out one level
    map.setOptions({ zoom: (map.zoom - 1) });

  });
});
