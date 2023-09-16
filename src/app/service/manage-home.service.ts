import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageHomeService {

 
  constructor(private http : HttpClient) { }
//Start Home Page
  homePage:any=[{}];
  showAllHomePage(){
    this.http.get('https://localhost:7152/api/Page').subscribe((res)=>{
      this.homePage = res;
    }, err=>{
      console.log(err);
      
    })
  }

  updateHomePage(body:any){
    body.image=this.showImage ;
    this.http.put('https://localhost:7152/api/Page/', body).subscribe((res)=>{
      console.log(res);
      
    }, err=>{
      console.log(err);
      
    })
  }

  showImage:any;
  uploadImage(img:FormData){
    this.http.post('https://localhost:7152/api/Page/uploadImage/', img).subscribe((res:any)=>{
      this.showImage = res.image;
    }, err=>{
      console.log(err);
      
    })
  }
//End Home Page

//start About Page
  aboutPage:any=[{}];
  showAllAboutPage(){
    this.http.get('https://localhost:7152/api/About').subscribe((res)=>{
      this.aboutPage = res;
    }, err=>{
      console.log(err);
      
    })
  }

  updateAboutPage(obj:any){
    obj.image=this.aboutImage;
    this.http.put('https://localhost:7152/api/About/', obj).subscribe((res:any)=>{
      window.location.reload();
      console.log(res);
      
    }, err=>{
      console.log(err);
      
    })
  }

  aboutImage:any;
  uploadAboutImage(img:FormData){
    this.http.post('https://localhost:7152/api/About/uploadImage/', img).subscribe((res:any)=>{
      this.aboutImage=res.image;
    }, err=>{
      console.log(err);
      
    })
  }
// End About Page

//Start Contact Page
  contacts:any=[{}];
  gatAllContact(){
    this.http.get('https://localhost:7152/api/Contact').subscribe((res:any)=>{
      this.contacts = res;
    },err=>{
      console.log(err);
      
    })
  }
//End Contact Page

//Start Testimonial
  test:any=[{}];
  getAllTestimonial(){
    this.http.get('https://localhost:7152/api/Testimonial').subscribe((res:any)=>{
      this.test = res;
    }, err=>{
      console.log(err);
      
    })
  }

  deleteTestimonial(id : number){
    this.http.delete('https://localhost:7152/api/Testimonial/'+id).subscribe((res)=>{
    window.location.reload();
    }, err=>{
      console.log(err);
      
    })
  }

  acceptTestimonials(id:number){
    this.http.post('https://localhost:7152/api/testimonial/accept/', id).subscribe((res:any)=>{
      //window.location.reload();
      console.log(res);
      
    },err=>{
      console.log(err);
      
    })
  }
// End Testimonial

//Report
chartdata:any;
labeldata:any[]=[];
realdata:any[]=[];
  report : any = [{}];
  viewReport(){
    this.http.get('https://localhost:7152/api/AdminReport').subscribe((res:any)=>{
      this.report=res;
      this.chartdata=res;
      if (this.chartdata !=null){
        for (let i = 0; i < this.chartdata.length; i++) {
          this.labeldata.push(this.chartdata[i].departuredate);
          this.realdata.push(this.chartdata[i].total_price);
          
        }
      }
    }, err=>{
      console.log(err);
      
    })
  }
  
  dateShow: any = [{}];
  searchDate(obj:any){
    debugger;
    this.http.post('https://localhost:7152/api/AdminReport', obj).subscribe((res:any)=>{
      
      this.dateShow = res;
      console.log(this.dateShow);
    }, err=>{
      console.log(err);
      
    })
  }


}
