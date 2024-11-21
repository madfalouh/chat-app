import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-friend-request-modal',
  templateUrl: './friend-request-modal.component.html',
  styleUrl: './friend-request-modal.component.css'
})
export class FriendRequestModalComponent {

  @Input() name! : string ;

  constructor(public activeModal: NgbActiveModal) {}


  sendRequest() {
    const requestData = {
      friendName: this.name,
    };
    this.activeModal.close(requestData);
  }

  cancel() {
    this.activeModal.dismiss('Cancel clicked');
  }




}
