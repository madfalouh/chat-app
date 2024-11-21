import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FriendRequestModalComponent } from '../modals/friend-request-modal/friend-request-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalService: NgbModal) {}


  openModal(name: string) {
    const modalRef = this.modalService.open(FriendRequestModalComponent, {
      size: 'md',
      backdrop: true,
      keyboard: true,
    });

    modalRef.componentInstance.name = name;
    return modalRef.result;
  }


}
