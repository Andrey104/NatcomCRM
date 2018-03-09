import {InstallerPosition} from '../installers/installer_position';

export class MountStage {
  id: number;
  installers: InstallerPosition[];
  actions: object[]; // add class
  transfers: object[]; // add class
  costs: object[]; // add class
  auto_date: string;
  date: string;
  status: number;
  comment: string;
  mount: number;
}
