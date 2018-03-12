import {Company} from '../company';
import {User} from '../user';
import {OurComment} from '../comment';
import {MountStage} from '../mount/mount-stage';

export class DealMount {
  id: number;
  actions: object;
  stages: MountStage[];
  comments: OurComment[];
  company: Company;
  date_mount: string;
  date: string;
  status: number;
  deal: number;
  user: User;
}
