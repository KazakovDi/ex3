export type TimeStamp = {
  from: string;
  to: string;
};
export interface TimeStampProp extends TimeStamp {
  width: number;
  left: number;
  offset: number;
}
