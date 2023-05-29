import { Component, OnInit } from '@angular/core';
import { blog } from 'src/app/interfaces/blog.interfaces';
import { PublicacionesService } from 'src/app/services/articulo.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  blogInfo: blog[] = [];

  constructor(private publicacionesService:PublicacionesService) { }

  ngOnInit(): void {
    this.getPublicaciones();
  }

  getPublicaciones(){
    this.publicacionesService.getBlogPublicaciones().subscribe((resp:blog[])=>{
      this.blogInfo = resp;
    });
  }
}
