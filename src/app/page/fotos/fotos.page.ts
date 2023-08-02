import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/service/photo.service';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.page.html',
  styleUrls: ['./fotos.page.scss'],
})
export class FotosPage implements OnInit {

  constructor( public PhotoService: PhotoService ) {}

 async ngOnInit() {

    await this.PhotoService.loadSaved();
  }

  addPhotoToGallery()
  {
    this.PhotoService.addNewToGallery()
  }

}
