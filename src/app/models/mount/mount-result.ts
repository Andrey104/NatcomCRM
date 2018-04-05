import {Action} from '../action';
import {OurComment} from '../comment';
import {Company} from '../company';
import {User} from '../user';
import {InstallerPosition} from '../installers/installer_position';
import {ClientsList} from '../clients/clients-list';
import {Picture} from '../picture';

export class MountResult {
  id: number;
  installers: InstallerPosition[];
  clients: ClientsList[];
  actions: Action[];
  transfers: any;
  costs: any;
  component_costs: any;
  comments: OurComment[];
  company: Company;
  user: User;
  address: string;
  address_comment: string;
  date_mount: string;
  date: string;
  description: string;
  status: number;
  deal: number;
  pictures: Picture[];
}
