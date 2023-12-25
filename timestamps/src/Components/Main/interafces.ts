export interface RawData {
  from: string;
  to: string;
}
export interface DataItemProps extends RawData {
  isSpace?: boolean;
  width?: number;
}
