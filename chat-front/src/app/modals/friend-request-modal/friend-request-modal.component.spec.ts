import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendRequestModalComponent } from './friend-request-modal.component';

describe('FriendRequestModalComponent', () => {
  let component: FriendRequestModalComponent;
  let fixture: ComponentFixture<FriendRequestModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FriendRequestModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendRequestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
