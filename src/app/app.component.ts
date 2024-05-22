import { Component, ViewChild, ElementRef } from "@angular/core";
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
    
    @ViewChild("targetRef") targetRef!: ElementRef<HTMLDivElement>;
    @ViewChild(NgxMoveableComponent) moveable!: NgxMoveableComponent;

    onFileSelected(event: any) {
        const file: File = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.imageUrl = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    scalable: any = true;
   keepRatio: any = true;
    throttleScale: any = 0;
    renderDirections: any = ["nw","n","ne","w","e","sw","s","se"];
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
}
