import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Installer} from '../../../../models/installers/installer';

@Component({
  selector: 'app-installer-list-item',
  templateUrl: './installer-list-item.component.html',
  styleUrls: ['./installer-list-item.component.css']
})
export class InstallerListItemComponent implements OnInit {


  constructor() { }
  @Input() installer;
  @Output() onSelect = new EventEmitter<Installer>();

  ngOnInit() {
  }
  select() {
    this.onSelect.emit(this.installer);
  }

}

