import { Component, ViewChild, ElementRef } from "@angular/core";
import html2canvas from "html2canvas";
import { NgxMoveableComponent } from "ngx-moveable";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    draggable: any = true;
    throttleDrag: any = 1;
    edgeDraggable: any = false;
    startDragRotate: any = 0;
    throttleDragRotate: any = 0;
    imageUrl: string | ArrayBuffer | null = null;
    moveableVisible: boolean = true;

    @ViewChild("targetRef") targetRef!: ElementRef<HTMLDivElement>;
    @ViewChild(NgxMoveableComponent) moveable!: NgxMoveableComponent;
    @ViewChild('meme', { static: false }) memeElement!: ElementRef;

    onFileSelected(event: any) {
        const file: File = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.imageUrl = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    handleFileChange(event: any) {
        const file: File = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.imageUrl = e.target.result;
        };
        reader.readAsDataURL(file);
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

    scalable: any = true;
    keepRatio: any = true;
    throttleScale: any = 0;
    renderDirections: any = ["nw", "n", "ne", "w", "e", "sw", "s", "se"];
    rotatable: any = true;
    throttleRotate: any = 0;
    rotationPosition: any = "top";
    onDrag(e: { target: { style: { transform: any; }; }; transform: any; }) {
        e.target.style.transform = e.transform;
    }
    onScale(e: { target: { style: { transform: any; }; }; drag: { transform: any; }; }) {
        e.target.style.transform = e.drag.transform;
    }
    onRotate(e: { target: { style: { transform: any; }; }; drag: { transform: any; }; }) {
        e.target.style.transform = e.drag.transform;
    }

    toggleMoveable() {
        this.moveableVisible = !this.moveableVisible;
      }
}



// import { Component, ElementRef, ViewChild } from '@angular/core';
// import html2canvas from 'html2canvas';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   uploadedImg: string | null = null;
//   @ViewChild('meme', { static: false }) memeElement!: ElementRef;
//   @ViewChild('overlayImage', { static: false }) overlayImageElement!: ElementRef;

//   handleFileChange(event: Event) {
//     const target = event.target as HTMLInputElement;
//     const files = target.files;
//     if (files && files[0]) {
//       const file = files[0];
//       const reader = new FileReader();
//       reader.onload = () => {
//         this.uploadedImg = reader.result as string;
//       };
//       reader.readAsDataURL(file);
//     }
//   }

//   downloadMeme() {
//     const scale = window.matchMedia('(max-width: 767px)').matches ? 2 : 1;
//     html2canvas(this.memeElement.nativeElement, { scale }).then(canvas => {
//       const dataURL = canvas.toDataURL('image/png');
//       const downloadLink = document.createElement('a');
//       downloadLink.href = dataURL;
//       downloadLink.download = 'overlay_image.png';
//       document.body.appendChild(downloadLink);
//       downloadLink.click();
//       document.body.removeChild(downloadLink);
//     });
//   }

//   // Event handlers for ngx-moveable
//   onDragStart(event: any) {
//     console.log('Drag started', event);
//   }

//   onDrag(event: any) {
//     console.log('Dragging', event);
//   }

//   onDragEnd(event: any) {
//     console.log('Drag ended', event);
//   }

//   onResizeStart(event: any) {
//     console.log('Resize started', event);
//   }

//   onResize(event: any) {
//     console.log('Resizing', event);
//   }

//   onResizeEnd(event: any) {
//     console.log('Resize ended', event);
//   }
// }
