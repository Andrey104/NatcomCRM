import {MeasurementResult} from './measurement-result';

export class MeasurementPage {
  count: number;
  not_distributed: number;
  my_measurements: number;
  next: string;
  previous: string;
  results: MeasurementResult[];
}
