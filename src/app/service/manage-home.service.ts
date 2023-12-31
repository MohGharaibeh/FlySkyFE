import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageHomeService {

 
  constructor(private http : HttpClient, private toast:ToastrService) { }
//Start Home Page
  homePage:any=[{}];
  showAllHomePage(){
    this.http.get('https://localhost:7152/api/Page').subscribe((res:any)=>{
      this.homePage = res;
      this.showImage = res[0].image;
    }, err=>{
      console.log(err);
      
    })
  }

  updateHomePage(body:any){
    body.image=this.showImage ;
    this.http.put('https://localhost:7152/api/Page/', body).subscribe((res)=>{
      console.log(res);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      this.toast.success('Update Sucssesfuly')
    }, err=>{
      console.log(err);
      this.toast.error('Somthing Error')
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
aboutImage:any;
uploadAboutImage(img:FormData){
  this.http.post('https://localhost:7152/api/About/uploadImage/', img).subscribe((res:any)=>{
    this.aboutImage=res.image;
  }, err=>{
    console.log(err);
    
  })
}
//start About Page
  aboutPage:any=[{}];
  showAllAboutPage(){
    debugger;
    this.http.get('https://localhost:7152/api/About').subscribe((res:any)=>{
      this.aboutPage = res;
      this.aboutImage = res[0].image;
      console.log(this.aboutPage);
      console.log(this.aboutImage);
    }, err=>{
      console.log(err);
      
    })
  }

  updateAboutPage(obj:any){
    debugger;
    obj.image=this.aboutImage;
    this.http.put('https://localhost:7152/api/About/', obj).subscribe((res:any)=>{
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      this.toast.success('Update Sucssesfuly')
      console.log(res);
      
    }, err=>{
      console.log(err);
      this.toast.error('Somthing Error')
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
  getContactById(id: number): Observable<any> {
    return this.http.get(`https://localhost:7152/api/Contact/GetByID/${id}`);
  }
//End Contact Page

//Start Testimonial
testForUser: any = [{}];
  test:any=[{}];
  getAllTestimonial(){
    this.http.get('https://localhost:7152/api/Testimonial').subscribe((res:any)=>{
      this.test = res;
      this.testForUser = res.filter((testimonial:any) => testimonial.status === 'accept');
    }, err=>{
      console.log(err);
      
    })
  }

  deleteTestimonial(id : number){
    debugger;
    this.http.delete('https://localhost:7152/api/Testimonial/delete/'+id).subscribe((res)=>{
    window.location.reload();
    }, err=>{
      console.log(err);

    })
  }
createTestimonial(body:any){
    debugger;
    this.http.post('https://localhost:7152/api/Testimonial/createTest',body).subscribe((res:any)=>{
      console.log(res);
    },err=>{
      console.log(err);
    })
  }

  acceptTestimonials(id:number){
    debugger;
    const requestBody = { Testimonialid: id };
    this.http.put('https://localhost:7152/api/Testimonial/updateTest/', requestBody).subscribe((res:any)=>{
      console.log(res);
      window.location.reload();
      
    },err=>{
      console.log(err);
      
    })
  }
// End Testimonial

//Report
// chartdata:any;
// labeldata:any[]=[];
// realdata:any[]=[];
  report : any = [{}];
  viewReport(){
    this.http.get('https://localhost:7152/api/AdminReport').subscribe((res:any)=>{
      this.report=res;
      // this.chartdata=res;
      // if (this.chartdata !=null){
      //   for (let i = 0; i < this.chartdata.length; i++) {
      //     this.labeldata.push(this.chartdata[i].departuredate);
      //     this.realdata.push(this.chartdata[i].total_price);
          
      //   }
      //}
    }, err=>{
      console.log(err);
      
    })
  }
  
  chartdata:any;
labeldata:any[]=[];
realdata:any[]=[];
  chart : any = [{}];
  viewChart(){
    this.http.get('https://localhost:7152/api/AdminReport/chart').subscribe((res:any)=>{
      //this.chart=res;
      this.chartdata=res;
      if (this.chartdata !=null){
        for (let i = 0; i < this.chartdata.length; i++) {
          this.labeldata.push(this.chartdata[i].year_only);
          this.realdata.push(this.chartdata[i].total_price);
        }
      }
    }, err=>{
      console.log(err);
      
    })
  }
 
  searchDate(obj:any){
    debugger;
    const requestDate = {departuredate: obj.departuredate , arrivaldate: obj.arrivaldate}
    this.http.post('https://localhost:7152/api/AdminReport/searchReport', requestDate).subscribe((res:any)=>{
      
      this.report = res;
      console.log(this.report);
    }, err=>{
      console.log(err);
      
    })
  }
  myProfit:any;
  profit(){
    debugger;
    this.http.get('https://localhost:7152/api/AdminReport/profit').subscribe((res:any)=>{
      
      this.myProfit = res.profit;
      console.log(this.myProfit);
    }, err=>{
      console.log(err);
      
    })
  }

  


}
