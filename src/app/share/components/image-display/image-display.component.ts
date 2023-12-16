import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-display.component.html',
  styleUrls: ['./image-display.component.css']
})
export class ImageDisplayComponent {

  @Output() deleteImage = new EventEmitter<string>();

  @Input()
  public image?:Blob;

  public loadedImage?: any;

  ngOnInit(){

    if(!this.image) return;

    let arrayBufferResult;

    const file = new FileReader();

    file.onloadend = async () => {
      arrayBufferResult = file.result;
      let intoBlob = new Blob([arrayBufferResult as any], {type: "image/jpeg"});
      let realBlob = URL.createObjectURL(intoBlob);
      this.loadedImage = realBlob;

    }
    file.readAsArrayBuffer(this.image);

  }

}
