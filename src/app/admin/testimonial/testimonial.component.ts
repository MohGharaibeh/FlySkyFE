import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ManageHomeService } from 'src/app/service/manage-home.service';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit {
  constructor(public tests:ManageHomeService, private dialog: MatDialog){}
  ngOnInit(): void {
    this.tests.getAllTestimonial();
  }

  @ViewChild('deleteDialog') delDialog !: TemplateRef<any>
  openDeleteDialog(id: number){
    const op = this.dialog.open(this.delDialog);
    op.afterClosed().subscribe((res)=>{
      if (res != undefined){
        if (res == 'yes'){
          this.tests.deleteTestimonial(id);
        }
        else if (res == 'no'){
          console.log(res);
          
        }
      }
    })
  }

  acceptTestimonial(id: number){
    debugger;
    this.tests.acceptTestimonials(id);
  }


}
