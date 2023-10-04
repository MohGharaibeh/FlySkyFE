import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ManageHomeService } from 'src/app/service/manage-home.service';

@Component({
  selector: 'app-testinomial',
  templateUrl: './testinomial.component.html',
  styleUrls: ['./testinomial.component.css']
})
export class TestinomialComponent{

  constructor(public tests: ManageHomeService, public toast:ToastrService){}
  
  createForm: FormGroup = new FormGroup({
    Message: new FormControl(''),
    Status : new FormControl('check'),
    Userid : new FormControl(localStorage.getItem('userID'))

  })
  create(){
    this.tests.createTestimonial(this.createForm.value);
    this.toast.success('Testimonial Sent');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
  
}
