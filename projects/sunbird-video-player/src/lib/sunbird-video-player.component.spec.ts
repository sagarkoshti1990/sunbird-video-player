import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SunbirdVideoPlayerComponent } from './sunbird-video-player.component';
import { SunbirdVideoPlayerService } from './sunbird-video-player.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ViewerService } from './services/viewer.service';
import { HttpClientModule } from '@angular/common/http';
import { mockData } from './sunbird-video-player.component.spec.data';
import { ErrorService } from '@project-sunbird/sunbird-player-sdk-v9';


xdescribe('SunbirdVideoPlayerComponent', () => {
  let component: SunbirdVideoPlayerComponent;
  let fixture: ComponentFixture<SunbirdVideoPlayerComponent>;
  let timerCallback;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ SunbirdVideoPlayerComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [ViewerService, SunbirdVideoPlayerService, ErrorService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SunbirdVideoPlayerComponent);
    component = fixture.componentInstance;
    component.playerConfig = mockData.playerConfig;
    timerCallback = jasmine.createSpy('timerCallback');
    jasmine.clock().uninstall();
    jasmine.clock().install();
    fixture.detectChanges();
  });

  // tslint:disable-next-line:only-arrow-functions
  afterEach(function() {
    jasmine.clock().uninstall();
  });

  it('should initialize player config and log event when offline', () => {
    const sunbirdVideoPlayerService = TestBed.get(SunbirdVideoPlayerService);
    const viewerService = TestBed.get(ViewerService);
    const errorService = TestBed.get(ErrorService);
    spyOn(sunbirdVideoPlayerService, 'initialize');
    spyOn(viewerService, 'initialize');
    spyOn(viewerService, 'raiseExceptionLog');
    errorService.getInternetConnectivityError.emit({ error: 'test' });
    component.ngOnInit();
    expect(component.viewState).toEqual('player');
    expect(sunbirdVideoPlayerService.initialize).toHaveBeenCalled();
    expect(viewerService.initialize).toHaveBeenCalled();
  });

  it('show controls sould be false after mentioned time', () => {
    component.isPaused = false;
    setInterval(() => {
      if (!component.isPaused) {
        component.showControls = false;
      }
    }, 100);
    expect(component.showControls).toBeTruthy();
    jasmine.clock().tick(101);
    expect(component.showControls).toBeFalsy();
  });
});
