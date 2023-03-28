import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PickupcallPage } from './pickupcall.page';
import {Router} from "@angular/router";

describe('PickupcallPage', () => {
  let component: PickupcallPage;
  let fixture: ComponentFixture<PickupcallPage>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PickupcallPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PickupcallPage);

    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should navigate the user to the home screen when on create pickup call clicked', () => {
    spyOn(router, 'navigate');

    component.onCreatePickupCall();

    expect(router.navigate).toHaveBeenCalledWith(['home']);
  });
});
