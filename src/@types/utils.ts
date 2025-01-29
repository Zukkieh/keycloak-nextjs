export interface BaseOption {
  value: string;
  label: string;
}

export type Option<T = object> = BaseOption & T;

export type TimeLineType = {
  date?: string;
  description: string;
  subDescription?: string;
  status?: string;
};
