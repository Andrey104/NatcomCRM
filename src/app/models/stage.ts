import {User} from './user';
import {InstallerPosition} from './installers/installer_position';

export class Stage {
  id: number;
  installers: InstallerPosition[];
  actions: object;
  transfer: object;
  costs: object;
  auto_date: string;
  date: string;
  status: number;
  comment: object;
  mount: number;
}
