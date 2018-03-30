import {Company} from '../company';
import {User} from '../user';
import {OurComment} from '../comment';
import {MountStage} from '../mount/mount-stage';
import {InstallerPosition} from '../installers/installer_position';
import {Cost} from '../cost';

export class DealMount {
  installers: InstallerPosition[];
  transfers: object;
  costs: Cost[];
  component_costs: Cost[];
  id: number;
  actions: object;
  stages: MountStage[];
  comments: OurComment[];
  company: Company;
  date_mount: string;
  date: string;
  status: number;
  description: string;
  deal: number;
  user: User;
}
