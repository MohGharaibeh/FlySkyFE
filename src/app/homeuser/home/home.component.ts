import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SearchDateUserService } from 'src/app/service/search-date-user.service';
import {GeolocationService} from '@ng-web-apis/geolocation';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  map: any;
  startDate: string ='';
  endDate: string ='';
  fromCountry: string ='';
  toCountry: string ='';
  constructor(public search: SearchDateUserService,public dialog: MatDialog, private readonly geolocation$: GeolocationService){}
  ngOnInit() {
    // Create a Leaflet map
    this.map = L.map('map').setView([0, 0], 13);

    // Add a base layer (e.g., OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // Ask for geolocation permission and show the user's location on the map
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.map.setView([latitude, longitude], 13);
          L.marker([latitude, longitude]).addTo(this.map);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported in this browser.');
    }
  }

  getPosition() {
    this.geolocation$.subscribe((position) => {
       
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
