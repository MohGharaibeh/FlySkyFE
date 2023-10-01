import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SearchDateUserService } from 'src/app/service/search-date-user.service';
import {GeolocationService} from '@ng-web-apis/geolocation';
import * as L from 'leaflet';
import { FlightService } from 'src/app/service/flight.service';
import 'leaflet-routing-machine'; 
import axios from 'axios';
import 'leaflet';
import 'leaflet.markercluster';
import { Router } from '@angular/router';
import { DynamicHomeService } from 'src/app/service/dynamic-home.service';
import { ManageHomeService } from 'src/app/service/manage-home.service';
//import 'leaflet.markercluster/dist/MarkerCluster.Default.css'; // Add this line to import the default styles

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  private map!: L.Map;
  private flights: any[] = []; // Flight data from your API
  private markers!: L.MarkerClusterGroup;
  private opencageApiKey = '94d327738f5447bf845fb218ae53abde';

  startDate: string ='';
  endDate: string ='';
  fromCountry: string ='';
  toCountry: string ='';
  constructor(public search: SearchDateUserService,public dialog: MatDialog,
    private readonly geolocation$: GeolocationService,
    public fly : FlightService, 
    public router:Router, public home:DynamicHomeService,
    public testi:ManageHomeService){}
  
  async ngOnInit() {
    // Create a Leaflet map
    this.map = L.map('map').setView([0, 0], 3);

    // Add a base layer (e.g., OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // Initialize the marker cluster group with custom icon
    this.markers = L.markerClusterGroup({
      iconCreateFunction: function(cluster) {
        // Customize the cluster icon using your custom image
        return L.divIcon({
          html: '<img src="../../../assets/ApiImage/palnicon.png" alt="Custom Cluster Icon" style="width: 32px; height: 32px;" />',
          className: 'custom-cluster-icon'
        });
      }
    });

    this.map.addLayer(this.markers);

    // Fetch flight data from your API
    this.getAllFlight();
  }

  private getAllFlight() {
    axios
      .get('https://localhost:7152/api/flight')
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
    this.flights.forEach((flight: any) => {
      const city = flight.fromcountry; // Use 'fromcountry' as the city name
      const flightDetails = `<br>Departure : ${flight.departuredate},<br>Arrival : ${flight.arrivaldate},
       <br>Price: ${flight.price}.<br>${flight.fromcountry} - ${flight.tocountry}`;
      if (city) {
        this.geocodeCity(city, flightDetails, flight.flightid, flight.price);
      }
    });
  }

  private geocodeCity(city: string, flightDetails: string, flightid: number, price: number) {
    const geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${this.opencageApiKey}`;

    axios
      .get(geocodeUrl)
      .then((response) => {
        const { lat, lng } = response.data.results[0].geometry;

        // Create a marker for the geocoded city with flight details in the popup
        const marker = L.marker([lat, lng])
          .bindPopup(`<strong>City:</strong> ${city}<br><strong>Flight Details:</strong> ${flightDetails}`)
          .on('mouseover', () => {
            marker.openPopup(); // Use an arrow function to capture the 'this' context
          })
          .on('mouseout', () => {
            marker.closePopup(); // Use an arrow function to capture the 'this' context
          })
          .on('click', () => {
            // Set flightID and price directly in the FlightService
            this.dialog.open(this.ticketMap)
            this.fly.flightID = flightid;
            this.fly.priceMap = price;
            
            // Navigate to the pay route
            //this.router.navigate(['/user/pay']);
          });

        this.markers.addLayer(marker); // Add the marker to the cluster group
      })
      .catch((error) => {
        console.error(`Error geocoding ${city}:`, error);
      });


      this.home.getHomeById();
    this.testi.getAllTestimonial();
    this.home.getAboutById();
    this.fly.getAllFlight();

  }


  @ViewChild('putTicket') ticketMap !: TemplateRef<any>
  @ViewChild('searchDialog') searchDialog !: TemplateRef<any>
  @ViewChild('searchCountryDialog') searchCountryDialog !: TemplateRef<any>
  onSearch(){
    const dateRange = { Departuredate: this.startDate, Arrivaldate: this.endDate };

    this.search.serachDate(dateRange);
   //this.dialog.open(this.searchDialog);
   this.router.navigate(['/user/search'])
  }

  serachCountry(){
    const countryRange = {Fromcountry: this.fromCountry , Tocountry: this.toCountry};
    this.search.searchCountry(countryRange);
    //this.dialog.open(this.searchCountryDialog);
    this.router.navigate(['/user/search'])
  }
  
  goToPay(id:number,dep:Date,arr:Date){
    this.fly.gitItById(id);
    this.fly.flightID = id;
    this.fly.depDate = dep;
    this.fly.arrDate = arr;
    this.router.navigate(['/user/pay']);
  }
  totalPrice:number=0;

  numOfTicket=(ev:any, price:number)=>{
    console.log(ev.target.value);
    this.totalPrice= Number(ev.target.value) ;
    this.fly.totalPrice = Number(ev.target.value) * +price;
    this.fly.ticket = Number(ev.target.value) ;
  }
  tickMap:number=0;
  tikMap=(ev:any)=>{
    this.tickMap = Number(ev.target.value);
    this.fly.ticket = Number(ev.target.value);
  }

  takeTicket(){
    this.fly.totalPrice = this.tickMap * this.fly.priceMap;
    setTimeout(() => {
      this.router.navigate(['/user/pay']);
    }, 2000);
  }
}
