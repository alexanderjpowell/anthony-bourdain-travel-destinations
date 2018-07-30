function initMap() {

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 3,
          center: {lat: 22.681, lng: -34.805} //22.681097, -34.805607
        });

        var markers = [];
        var infowindow = new google.maps.InfoWindow; // Make global InfoWindow so that only one displays at a time

        function addMarkers(location, map, placeName) {
          infowindow = new google.maps.InfoWindow({
            content: '<p>More Info About <b>' + placeName + '</b></p>'
          }); // Create the text window
          var marker = new google.maps.Marker({
            position: location,
            map: map
          }); // Create the marker
          markers.push(marker); // Add to array of markers
          marker.addListener('click', function() {
            infowindow.open(map, marker);
            infowindow.setContent('<p><b>' + placeName + '</b></p>');
          }); // onClickListener for text window
        }

        //file:///Users/alexanderpowell/Desktop/bourdain-app/models/data.txt
        function readTextFile(file)
        {
            var rawFile = new XMLHttpRequest();
            rawFile.open("GET", file, false);
            var places = null;
            rawFile.onreadystatechange = function ()
            {
                if(rawFile.readyState === 4)
                {
                    if(rawFile.status === 200 || rawFile.status == 0)
                    {
                        var allText = rawFile.responseText;
                        places = allText.split('\n');

                    }
                }
            }
            rawFile.send(null);
            return places;
        }

        var rows = readTextFile('https://raw.githubusercontent.com/alexanderjpowell/anthony-bourdain-travel-destinations/master/models/data.txt');

        for (var i = 1; i < rows.length; i++) { // Start at 1 to ignore column headers
          var data = rows[i].split('|');
          if (data.length != 3) {
            break;
          }
          addMarkers({lat: Number(data[0]), lng: Number(data[1])}, map, data[2]);
        }

        //var rows = readTextFile('https://raw.githubusercontent.com/alexanderjpowell/bourdain-travel-destinations/master/data.txt');
        //console.log(rows);
        //alert(rows[0]);

        // Add a marker clusterer to manage the markers.
        var markerCluster = new MarkerClusterer(map, markers,
            // this path needs to be changed before deployment - path should point to a url containing all 5 image cluster icons
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});


      }