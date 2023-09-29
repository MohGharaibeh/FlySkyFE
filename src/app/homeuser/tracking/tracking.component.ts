import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SearchDateUserService } from 'src/app/service/search-date-user.service';
import {GeolocationService} from '@ng-web-apis/geolocation';
import * as L from 'leaflet';
import { FlightService } from 'src/app/service/flight.service';
import * as MapboxGeocoder from 'mapbox-gl-geocoder';
import 'leaflet-routing-machine'; 
import * as mapboxgl from 'mapbox-gl';
import axios from 'axios';
import 'leaflet';
import 'leaflet.markercluster';
import 'leaflet-moving-marker'; // Import the moving marker library
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { DynamicHomeService } from 'src/app/service/dynamic-home.service';
import { ManageHomeService } from 'src/app/service/manage-home.service';
import { ReservedService } from 'src/app/service/reserved.service';
import 'leaflet-routing-machine';
@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {
  private map!: L.Map;
  private markers: L.MarkerClusterGroup;
  private flightPath: L.LatLng[] = [];
  private airplaneIcon!: L.Icon;
  private airplaneMarker: L.Marker | null = null;
  private animationInterval: any;
  private animationIndex: number = 0;

  constructor(public search: SearchDateUserService,public dialog: MatDialog,
    private readonly geolocation$: GeolocationService,public fly : FlightService, 
    public router:Router, public home:DynamicHomeService, public testi:ManageHomeService,
    public reserved:ReservedService){
      this.markers = L.markerClusterGroup();
      // this.airplaneIcon = L.icon({
      //   iconUrl: '../../../assets/ApiImage/palnicon.png', // Replace with the URL of your airplane icon image
      //   iconSize: [32, 32],
      //   iconAnchor: [16, 16], // Center the icon on the marker
      // });
      //../../../assets/ApiImage/palnicon.png

    }

   ngOnInit() {
    this.reserved.getReservedUser(Number(localStorage.getItem('userID')))


    this.map = L.map('map').setView([0, 0], 3);

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    // Initialize the airplane icon with the custom image
    this.airplaneIcon = L.icon({
      iconUrl: '../../../assets/ApiImage/palnicon.png', // Replace with the URL of your airplane icon image
      iconSize: [32, 32],
      iconAnchor: [16, 16], // Center the icon on the marker
    });

    // Fetch flight data from your API
    const userID = Number(localStorage.getItem('userID'));
    this.trackingFlight(userID);
  }

  ngOnDestroy(): void {
    // Clean up the setInterval when the component is destroyed
    clearInterval(this.animationInterval);
  }

  trackingFlight(id: number) {
    axios
      .get(`https://localhost:7152/api/useraccount/track/${id}`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          const flights = response.data;
          console.log('Flight Data:', flights);

          // Plot flight markers on the map
          this.plotFlightMarkers(flights);
        } else {
          console.error('Invalid API response format:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching flight data:', error);
      });
  }

  plotFlightMarkers(flights: any) {
    flights.forEach((flight: any) => {
      const fromCountry = flight.fromcountry;
      const toCountry = flight.tocountry;

      // Use the geocodeCity function to get the coordinates for "fromCountry" and "toCountry"
      this.geocodeCity(fromCountry, (fromCoords) => {
        this.geocodeCity(toCountry, (toCoords) => {
          // Create an airplane marker with the custom icon at the start of the path (fromCountry)
          this.airplaneMarker = L.marker(fromCoords, { icon: this.airplaneIcon });

          // Create markers for "fromCountry" and "toCountry" with flight details in the popups
          const fromMarker = L.marker(fromCoords).bindPopup(`From: ${fromCountry}`);
          const toMarker = L.marker(toCoords).bindPopup(`To: ${toCountry}`);

          // Create a line connecting fromCountry to toCountry
          const flightLine = L.polyline([fromCoords, toCoords], { color: 'blue' });

          // Store the flight path coordinates
          const lineLatLngs = flightLine.getLatLngs() as L.LatLng[];
          this.flightPath.push(...lineLatLngs);

          // Add markers and the flight line to the marker cluster group
          this.markers.addLayer(fromMarker);
          this.markers.addLayer(toMarker);
          this.markers.addLayer(flightLine);

          // Add the airplane marker to the map
          if (this.airplaneMarker) {
            this.airplaneMarker.addTo(this.map);
          }

          // Start the animation
          this.startAnimation();
        });
      });
    });

    // Add the marker cluster group to the map
    this.map.addLayer(this.markers);
  }

  geocodeCity(city: string, callback: (coords: [number, number]) => void) {
    const opencageApiKey = '94d327738f5447bf845fb218ae53abde'; // Replace with your actual API key
    const geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${opencageApiKey}`;

    axios
      .get(geocodeUrl)
      .then((response) => {
        const lat = response.data.results[0].geometry.lat;
        const lng = response.data.results[0].geometry.lng;
        callback([lat, lng]);
      })
      .catch((error) => {
        console.error(`Error geocoding ${city}:`, error);
      });
  }

  private calculateIntermediatePoints(startLatLng: L.LatLng, endLatLng: L.LatLng, numPoints: number): L.LatLng[] {
    const intermediatePoints: L.LatLng[] = [];

    for (let i = 1; i <= numPoints; i++) {
      const fraction = i / (numPoints + 1);
      const lat = startLatLng.lat + (endLatLng.lat - startLatLng.lat) * fraction;
      const lng = startLatLng.lng + (endLatLng.lng - startLatLng.lng) * fraction;
      intermediatePoints.push(L.latLng(lat, lng));
    }

    return intermediatePoints;
  }

  private startAnimation() {
    this.animationIndex = 0;
  
    const intermediatePoints = this.calculateIntermediatePoints(
      this.flightPath[0],
      this.flightPath[this.flightPath.length - 1],
      5 // You can adjust this number for more or fewer intermediate points
    );
  
    this.animationInterval = setInterval(() => {
      if (
        this.airplaneMarker &&
        intermediatePoints &&
        this.animationIndex < intermediatePoints.length
      ) {
        // Update the marker's position to simulate movement
        const intermediateLatLng = intermediatePoints[this.animationIndex];
        this.airplaneMarker.setLatLng(intermediateLatLng);
  
        this.animationIndex++;
      } else {
        // Stop the animation when it reaches the end point
        this.airplaneMarker!.setLatLng(this.flightPath[this.flightPath.length - 1]); // Set the marker to the end point
        clearInterval(this.animationInterval);
      }
  
  
    }, 5000); // Move the airplane every 5 seconds


  }

}
