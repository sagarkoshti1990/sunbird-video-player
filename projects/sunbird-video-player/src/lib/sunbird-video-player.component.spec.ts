import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SunbirdVideoPlayerComponent } from './sunbird-video-player.component';
import { SunbirdVideoPlayerService } from './sunbird-video-player.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ViewerService } from './services/viewer.service';
import { HttpClientModule } from '@angular/common/http';
import { mockData } from './sunbird-video-player.component.spec.data';
import { ErrorService } from '@project-sunbird/sunbird-player-sdk';


describe('SunbirdVideoPlayerComponent', () => {
  let component: SunbirdVideoPlayerComponent;
  let fixture: ComponentFixture<SunbirdVideoPlayerComponent>;

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
    fixture.detectChanges();
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
    expect(viewerService.raiseExceptionLog).toHaveBeenCalledWith('CPV2_INT_CONNECT_01',
      'content load to failed , No Internet Available', 'test', 'afhjgh');
  });
});
