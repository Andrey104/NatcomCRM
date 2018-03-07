import {User} from './user';
import {InstallerPosition} from './installers/installer_position';
import {DealAction} from './deal/deal_action';

export class Stage {
  id: number;
  installers: InstallerPosition[];
  actions: DealAction[];
  transfer: object;
  costs: object;
  auto_date: string;
  date: string;
  status: number;
  comment: object;
  mount: number;
}
