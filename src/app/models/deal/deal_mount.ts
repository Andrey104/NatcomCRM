import {Company} from '../company';
import {User} from '../user';
import {OurComment} from '../comment';
import {InstallerPosition} from '../installers/installer_position';
import {Cost} from '../cost';
import {Action} from '../action';
import {Picture} from '../picture';
import {Client} from '../clients/client';

export class DealMount {
  id: number;
  installers: InstallerPosition[];
  clients: Client[];
  actions: Action[];
  transfers: any;
  costs: Cost[];
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
