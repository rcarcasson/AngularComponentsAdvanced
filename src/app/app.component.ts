import { AfterContentInit, AfterViewInit,  Component, ComponentFactoryResolver, ComponentRef, ElementRef, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { SimpleAlertViewComponent } from './simple-alert-view/simple-alert-view.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit, AfterViewInit {
  public isAddTimerVisible: boolean = false;
  public time: number = 0;
  public timers:Array<number> = [];
  @ViewChild('timerInput') timeInput: ElementRef;
  @ViewChild('alert', {read: ViewContainerRef}) alertContainer: ViewContainerRef;
  public simpleAlert: ComponentRef<SimpleAlertViewComponent> = null;

  constructor(private renderer: Renderer2, private resolver: ComponentFactoryResolver) {
    this.timers = [3, 20, 185];
   }

   ngAfterContentInit() {
  }
  
  ngAfterViewInit() {
    console.log(this.timeInput);
    this.renderer.setAttribute(this.timeInput.nativeElement, 'placeholder', 'Enter secods');
    this.renderer.addClass(this.timeInput.nativeElement, 'time-in');
  }

  logCountdownEnd() {
    console.log('the countdown has finished');
  }

  showAddTimer() {
    this.isAddTimerVisible = true;
    setTimeout(() => {
      this.renderer.selectRootElement(this.timeInput.nativeElement).focus();
    });
  }

  hideAddTimer() {
    this.isAddTimerVisible = false;
  }

  showEndTimerAlert() {
    const alertFactory = this.resolver.resolveComponentFactory(SimpleAlertViewComponent);
    this.simpleAlert = this.alertContainer.createComponent(alertFactory);
    this.simpleAlert.instance.title = 'Timer Ended';
    this.simpleAlert.instance.message = 'Your countdown has finished';
    this.simpleAlert.instance.onDismiss.subscribe( () => { this.simpleAlert.destroy(); })
    this.simpleAlert.instance.show();
  }

  submitAddTimer() {
    this.timers.push(this.time);
    this.hideAddTimer();
  }

}
