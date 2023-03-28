import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import {Router} from "@angular/router";

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should navigate to pickupcalls page when on click see all', () => {
    spyOn(router, 'navigate');

    component.seeAll();

    expect(router.navigate).toHaveBeenCalledWith(['pickupcalls']);
  });

  it('should navigate to pickupcalls page when on click see all', () => {
    spyOn(router, 'navigate');

    component.createPickupCall();

    expect(router.navigate).toHaveBeenCalledWith(['pickupcall']);
  });
});
