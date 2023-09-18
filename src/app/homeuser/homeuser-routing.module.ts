import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { TestimonialComponent } from '../admin/testimonial/testimonial.component';
import { TestinomialComponent } from './testinomial/testinomial.component';

const routes: Routes = [
  {
    path: 'index',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'testimonial',
    component: TestinomialComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeuserRoutingModule { }
