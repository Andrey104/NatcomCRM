import {InstallerPosition} from '../installers/installer_position';
import {DealAction} from '../deal/deal_action';
import {Cost} from '../cost';

export class MountStage {
  id: number;
  installers: InstallerPosition[];
  actions: DealAction[]; // add class
  transfers: object[]; // add class
  costs: Cost[]; // add class
  auto_date: string;
  date: string;
  status: number;
  comment: string;
  mount: number;
}
