import { Dataset } from './dataset';
import { Legend } from './legend';

export interface ChartData {
    type: string;
    data: {
        datasets: Array<Dataset>;
        labels: Array<String>;
    };
    legends: Array<Legend>;
    options: {};
}