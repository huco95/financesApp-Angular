export interface Dataset {
    type?: string;
    data?: Array<number>;
    label?: string;
    backgroundColor?: string | Array<string>;
    borderColor?: string;
    borderWidth?: number;
    pointBackgroundColor?: string;
    pointBorderColor?: string;
    fill?: boolean;
}