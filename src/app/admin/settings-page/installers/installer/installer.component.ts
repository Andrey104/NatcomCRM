import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-installer',
  templateUrl: './installer.component.html',
  styleUrls: ['./installer.component.css']
})
export class InstallerComponent implements OnInit {


  constructor() { }
  @Input() installer;
  @Output() onEdit = new EventEmitter();

  ngOnInit() {
  }
  edit() {
    this.onEdit.emit();
  }

}
