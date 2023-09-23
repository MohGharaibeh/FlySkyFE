import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  private map!: L.Map;
  private flights: any[] = []; // Flight data from your API
  private opencageApiKey = '94d327738f5447bf845fb218ae53abde';
  startDate: string ='';
  endDate: string ='';
  fromCountry: string ='';
  toCountry: string ='';
  constructor(public search: SearchDateUserService,public dialog: MatDialog, private readonly geolocation$: GeolocationService,public fly : FlightService){}
  
  async ngOnInit() {
    // Create a Leaflet map
    this.map = L.map('map').setView([0, 0], 3);

    // Add a base layer (e.g., OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // Fetch flight data from your API
    this.getAllFlight();
  }

  private getAllFlight() {
    axios.get('https://localhost:7152/api/flight')
      .then((response) => {
        if (Array.isArray(response.data)) {
          this.flights = response.data;
          this.geocodeCities();
        } else {
          console.error('Invalid API response format:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching flight data:', error);
      });
  }

  private geocodeCities() {
    this.flights.forEach((flight:any) => {
      const city = flight.fromcountry; // Use 'fromcountry' as the city name

      if (city) {
        this.geocodeCity(city);
      }
    });
  }

  private geocodeCity(city: string) {
    const geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${this.opencageApiKey}`;

    axios.get(geocodeUrl)
      .then((response) => {
        const { lat, lng } = response.data.results[0].geometry;

        // Add a marker for the geocoded city
        L.marker([lat, lng])
          .bindPopup(city)
          .addTo(this.map);
          

      })
      .catch((error) => {
        console.error(`Error geocoding ${city}:`, error);
      });



  }


  
  @ViewChild('searchDialog') searchDialog !: TemplateRef<any>
  @ViewChild('searchCountryDialog') searchCountryDialog !: TemplateRef<any>
  onSearch(){
    const dateRange = { Departuredate: this.startDate, Arrivaldate: this.endDate };

    this.search.serachDate(dateRange);
   this.dialog.open(this.searchDialog);
  }

  serachCountry(){
    const countryRange = {Fromcountry: this.fromCountry , Tocountry: this.toCountry};
    this.search.searchCountry(countryRange);
    this.dialog.open(this.searchCountryDialog);
  }
}
