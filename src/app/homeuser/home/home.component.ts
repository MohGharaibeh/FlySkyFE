import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SearchDateUserService } from 'src/app/service/search-date-user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  startDate: string ='';
  endDate: string ='';
  fromCountry: string ='';
  toCountry: string ='';
  constructor(public search: SearchDateUserService,public dialog: MatDialog){}

  
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
