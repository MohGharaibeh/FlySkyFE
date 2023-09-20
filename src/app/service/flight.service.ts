import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(private http:HttpClient) { }

  flight:any = [{}];
  getAllFlight(){
    this.http.get('https://localhost:7152/api/Flight').subscribe((res:any)=>{
      this.flight = res;
    }, err =>{
      console.log(err);
    })
  }

  deleteFlight(id : number){
    this.http.delete('https://localhost:7152/api/Flight/'+id).subscribe((res)=>{
      console.log(res);
      window.location.reload();
    }, err=>{
      console.log(err);
      
    })
  }

  updateFlight(obj:any){
    obj.image=this.showImage;
    this.http.put('https://localhost:7152/api/Flight/',obj).subscribe((res)=>{
      console.log(res);
      window.location.reload();
    }, err=>{
      console.log(err);
      
    })
  }

  createFlight(obj:any){
    obj.image=this.showImage;
    debugger;
    this.http.post('https://localhost:7152/api/Flight/', obj).subscribe((res)=>{
      console.log(res);
      window.location.reload();
    }, err=>{
      console.log(err);
      
    })
  }

  showImage:any;
  uploadImage(img : FormData){
    this.http.post('https://localhost:7152/api/Flight/uploadImage', img).subscribe((res:any)=>{
      console.log(res);
      this.showImage = res.image;
    }, err=>{
      console.log(err);
      
    })
  }
  report : any = [{}];

  searchDate(obj:any){
    debugger;
    const requestDate = {Departuredate: obj.departuredate , Arrivaldate: obj.arrivaldate}
    this.http.post('https://localhost:7152/api/AdminReport/searchFlight', requestDate).subscribe((res:any)=>{
      
      this.flight = res;
      console.log(this.report);
    }, err=>{
      console.log(err);
      
    })
  }
//👀
getFlightById(id: number): Observable<any> {
  return this.http.get(`https://localhost:7152/api/Flight/GetByID/${id}`);
}
}
