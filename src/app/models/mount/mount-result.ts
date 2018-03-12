import {Action} from '../action';
import {OurComment} from '../comment';
import {Company} from '../company';
import {User} from '../user';
import {MountStage} from './mount-stage';

export class MountResult {
  id: number;
  actions: Action[];
  stages: MountStage[];
  comments: OurComment[];
  company: Company;
  user: User;
  date_mount: string;
  date: string;
  status: number;
  deal: number;
}
