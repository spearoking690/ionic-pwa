import { Component, OnInit } from '@angular/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SessionService } from 'src/app/services/session.service';
import { PhotoService } from 'src/app/services/photo.service';
import { Plugins } from '@capacitor/core';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.page.html',
  styleUrls: ['./photo.page.scss'],
})
export class PhotoPage implements OnInit {
  constructor(
    private sanitizer: DomSanitizer,
    public photoService: PhotoService
  ) {}
  photo: SafeResourceUrl;
  ngOnInit() {}
  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
}
