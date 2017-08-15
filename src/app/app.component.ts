import {
    Component,
    trigger,
    style,
    state,
    transition,
    animate
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
      trigger('divstate', [
          state('normal', style({
              'background-color': 'red',
              'height': '100px',
              'width': '100px',
              transform: 'translateX(0)'
          })),
          state('highlighted', style({
            'background-color': 'blue',
            'height': '300px',
            'width': '300px',
            transform: 'translateX(100px)'
          })),
          transition('normal => highlighted', animate(300)),
          transition('highlighted => normal', animate(800))
      ]),
      trigger('wildstate', [
          state('normal', style({
              'background-color': 'orange',
              transform: 'translateX(0) scale(1)'
          })),
          state('highlighted', style({
              'background-color': 'purple',
              transform: 'translateX(100px) scale(1)'
          })),
          state('shrunken', style({
              'background-color': 'teal',
              transform: 'translateX(0) scale(0.5)'
          })),
          transition('normal => highlighted', animate(400)),
          transition('highlighted => normal', animate(500)),
          transition('shrunken <=> *', [
              style({
                  'background-color': 'yellow',
              }),
              animate(1000, style({
                  'border-radius': '50px'
              })),
              animate(2000)
          ])
      ])
  ]
})
export class AppComponent {
    state= "normal";
    wildstate = "normal";
	list = ['Milk', 'Sugar', 'Bread'];

	onAdd(item) {
		this.list.push(item);
	}

	onDelete(item) {
		this.list.splice(this.list.indexOf(item), 1);
	}

  onAnimate() {
    this.state == 'normal' ? this.state = 'highlighted' : this.state = 'normal';
    this.wildstate == 'normal' ? this.wildstate = 'highlighted' : this.wildstate = 'normal';
  }

  onShrink() {
      this.wildstate = 'shrunken';
  }


}
