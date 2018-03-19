import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {InstallerPosition} from '../../../../models/installers/installer_position';

@Component({
  selector: 'app-brigade-installer',
  templateUrl: './brigade-installer.component.html',
  styleUrls: ['./brigade-installer.component.css']
})
export class BrigadeInstallerComponent implements OnInit {


  constructor() { }
  @Input() installerPosition;
  @Output() onDel = new EventEmitter<InstallerPosition>();

  ngOnInit() {
  }
  del() {
    this.onDel.emit(this.installerPosition);
  }

}
