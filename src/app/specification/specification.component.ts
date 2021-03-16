import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-specification',
  templateUrl: './specification.component.html',
  styleUrls: ['./specification.component.css']
})
export class SpecificationComponent implements OnInit {

  constructor(private ar:ActivatedRoute,private us:UserserviceService) { }

  productObj:any;
  ngOnInit(): void {

    this.ar.params.subscribe(
      res =>{
          this.us.getProductById(res.id).subscribe(
            data =>{
                this.productObj = data['message'] 
            }
          )
      },
      err=>{
        alert("something went wrong")
        console.log(err)
      }
    )
  }

}
