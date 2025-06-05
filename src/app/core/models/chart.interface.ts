export interface ChartOptions {
  series: {
    name: string;
    data: number[];
  }[];
  chart: {
    type: string;
    height: number;
  };
  dataLabels?: {
    enabled: boolean;
  };
  xaxis?: {
    categories: string[];
  };
  yaxis?: {
    title?: {
      text: string;
    };
  };
  plotOptions?: {
    bar?: {
      horizontal: boolean;
      columnWidth: string;
      endingShape: string;
    };
  };
  stroke?: {
    curve?: string;
    width?: number;
    colors?: string[];
  };
  fill?: {
    opacity?: number;
    type?: string;
    gradient?: {
      shadeIntensity: number;
      opacityFrom: number;
      opacityTo: number;
      stops: number[];
    };
  };
  tooltip?: {
    shared?: boolean;
    intersect?: boolean;
    y?: {
      formatter: (val: any) => string;
    };
  };
  title?: {
    text: string;
  };
  legend?: {
    show: boolean;
  };
} 