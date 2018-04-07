import {DealMeasurement} from '../deal/deal_measurement';

export class MeasurementPage {
  count: number;
  not_distributed: number;
  my_measurements: number;
  next: string;
  previous: string;
  results: DealMeasurement[];
}
