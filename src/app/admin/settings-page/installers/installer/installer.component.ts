import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Installer} from '../../../../models/installers/installer';

@Component({
  selector: 'app-installer',
  templateUrl: './installer.component.html',
  styleUrls: ['./installer.component.css']
})
export class InstallerComponent implements OnInit {


  constructor() { }
  @Input() installer;
  @Output() onEdit = new EventEmitter<Installer>();

  ngOnInit() {
  }
  edit() {
    this.onEdit.emit(this.installer);
  }

}
