import React from "react";
import { TimeStamp, TimeStampProp } from "./interafces";
import { styled } from "styled-components";
import Bar from "../Bar/Bar";
const dateObj = new Date();
const options: Intl.DateTimeFormatOptions = {
  weekday: "short",
  day: "numeric",
  month: "long",
};
const DateFormatter = Intl.DateTimeFormat("ru-RU", options);
const date = DateFormatter.format(dateObj);
const data: TimeStamp[] = [
  {
    from: "2023-05-30T05:56:28+00:00",
    to: "2023-05-30T05:57:10+00:00",
  },
  {
    from: "2023-05-30T06:01:01+00:00",
    to: "2023-05-30T06:49:31+00:00",
  },
  {
    from: "2023-05-30T07:04:21+00:00",
    to: "2023-05-30T07:05:26+00:00",
  },
  {
    from: "2023-05-30T08:27:42+00:00",
    to: "2023-05-30T08:28:52+00:00",
  },
  {
    from: "2023-05-30T08:29:43+00:00",
    to: "2023-05-30T08:31:28+00:00",
  },
  {
    from: "2023-05-30T10:19:15+00:00",
    to: "2023-05-30T10:21:02+00:00",
  },
  {
    from: "2023-05-30T16:50:26+00:00",
    to: "2023-05-30T16:50:49+00:00",
  },
  {
    from: "2023-05-30T17:03:12+00:00",
    to: "2023-05-30T17:04:24+00:00",
  },
  {
    from: "2023-05-30T17:05:11+00:00",
    to: "2023-05-30T17:05:55+00:00",
  },
  {
    from: "2023-05-30T19:29:46+00:00",
    to: "2023-05-30T19:31:04+00:00",
  },
  {
    from: "2023-05-30T20:42:28+00:00",
    to: "2023-05-30T20:43:31+00:00",
  },
];
const base = new Date("2023-05-30");
const properties: TimeStampProp[] = [];
for (let i = data.length - 1; i >= 0; i--) {
  const item = data[i];
  const from = Date.parse(item.from) - base.getTime();
  const width =
    ((Date.parse(item.to) - Date.parse(item.from)) * 100) / 86400000;
  const left = (from * 100) / 86400000;
  if (i === data.length - 1)
    properties.unshift({ width, offset: 0, left, ...item });
  else {
    const prevRes = properties[0];
    if (prevRes?.left !== undefined && prevRes?.left - left <= 6)
      properties.unshift({
        width,
        offset: 12 + prevRes.offset,
        left,
        ...item,
      });
    else properties.unshift({ width, offset: 0, left, ...item });
  }
}
const Main = () => {
  return (
    <div className="container">
      <Stats>
        <h4>{date}</h4>
        <p>{data.length} visits</p>
      </Stats>
      <Bar data={properties}></Bar>
    </div>
  );
};
const Stats = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export default Main;
