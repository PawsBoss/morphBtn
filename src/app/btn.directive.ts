import { Directive,OnInit,ElementRef,Renderer2, HostBinding } from '@angular/core';

@Directive({
    selector: '[appMorphBtn]',
    host: {
        '(click)': 'onClick()',
    }
})
export class MorphButtonDirective implements OnInit {

    private morphBtnWrap:HTMLDivElement;
    private morphContent:HTMLDivElement;
    private hiddenContent:HTMLDivElement;
    private closingEl:HTMLSpanElement;
    public expanded = false;
    public isAnimating: boolean;

    constructor(private render: Renderer2, private triggerBtn: ElementRef) {}

    ngOnInit() {
        console.log("INIT");
        console.log(this.triggerBtn);
        const el = this.triggerBtn.nativeElement;
        this.morphBtnWrap = el.parentElement;
        this.morphContent = el.nextElementSibling;
        this.hiddenContent = el.nextElementSibling.children[0].children[0];
        this.closingEl = el.nextElementSibling.children[0].children[0].children[0];

        this.closingEl.addEventListener( 'click', this.onClick.bind(this));
    }



    onClick() {
        console.log("Its working");

        //  This function will be called when ever the button or close icon is pressed

        //   1. Check to see if it's already animating, if it is return false to exit function
        if( this.isAnimating ) return false;

        //  2.  If the overlay has not expanded do so by setting the active class
        if( !this.expanded ) {
            this.render.addClass( this.morphBtnWrap, 'active' );
        }

        const self = this;
        const onEndTransition = function(event) {
            console.log("###########################");
            console.log(event);
            console.log(this);
            console.log(self);
            console.log("##################");
            if( event.target !== this ) return false;



            if( self.expanded && event.propertyName !== 'opacity' || !self.expanded && event.propertyName !== 'width' && event.propertyName !== 'height' && event.propertyName !== 'left' && event.propertyName !== 'top' ) {

                return false;
            }

            this.removeEventListener('transitionend', onEndTransition)


            self.isAnimating = false;


            // callback
            if( self.expanded ) {
                self.render.removeClass( self.morphBtnWrap, 'active' );
            }

            self.expanded = !self.expanded;
        };

        //  3.  If it was not animating not this it is
        this.isAnimating = true;

        this.morphContent.addEventListener( 'transitionend', onEndTransition );



        //  GET THE POSITION OF button
        // set the left and top values of the contentEl (same like the button)
        let buttonPosition = this.triggerBtn.nativeElement.getBoundingClientRect();
        console.log(buttonPosition);
    	// need to reset
    	this.render.addClass( this.morphContent, 'no-transition' );
        this.render.setStyle(this.morphContent, 'left', 'auto');
        this.render.setStyle(this.morphContent, 'top', 'auto');



        // add/remove class "open" to the button wraper
        setTimeout(() => {
            this.render.setStyle(this.morphContent, 'left', buttonPosition.left + 'px');
            this.render.setStyle(this.morphContent, 'top', buttonPosition.top + 'px');

            if( this.expanded ) {
                this.render.removeClass( this.morphContent, 'no-transition' );
                this.render.removeClass( this.morphBtnWrap, 'open' );
            }
            else {
                setTimeout(() => {
                    this.render.removeClass(this.morphContent, 'no-transition' );
                    this.render.addClass( this.morphBtnWrap, 'open' );
                }, 25 );
            }
        }, 25 );

    }



}
