import { Component, ElementRef, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  uploadedImg: string | null = null;
  @ViewChild('meme', { static: false }) memeElement!: ElementRef;
  @ViewChild('overlayImage', { static: false }) overlayImageElement!: ElementRef;

  handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.uploadedImg = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  downloadMeme() {
    const scale = window.matchMedia('(max-width: 767px)').matches ? 2 : 1;
    html2canvas(this.memeElement.nativeElement, { scale }).then(canvas => {
      const dataURL = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = dataURL;
      downloadLink.download = 'overlay_image.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    });
  }

  // Event handlers for ngx-moveable
  onDragStart(event: any) {
    console.log('Drag started', event);
  }

  onDrag(event: any) {
    console.log('Dragging', event);
  }

  onDragEnd(event: any) {
    console.log('Drag ended', event);
  }

  onResizeStart(event: any) {
    console.log('Resize started', event);
  }

  onResize(event: any) {
    console.log('Resizing', event);
  }

  onResizeEnd(event: any) {
    console.log('Resize ended', event);
  }
}
