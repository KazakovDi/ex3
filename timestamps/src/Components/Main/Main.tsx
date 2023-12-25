import React from "react";
import { RawData, DataItemProps } from "./interafces";
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
const data: RawData[] = [
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
const beginMargin =
  ((Date.parse(data[0].from) - Date.parse(base.toISOString())) * 100) /
  86400000;
const result: DataItemProps[] = [
  {
    from: "",
    to: "",
    width: beginMargin,
    isSpace: true,
  },
  {
    ...data[0],
    width:
      ((Date.parse(data[0].to) - Date.parse(data[0].from)) * 100) / 86400000,
    isSpace: false,
  },
];
for (let i = 1; i < data.length; i++) {
  const item: DataItemProps = { ...data[i], width: 0, isSpace: false };
  const prev = data[i - 1];
  const min15 = 900000;
  const diff = Date.parse(item.from) - Date.parse(prev.to);
  const width =
    ((Date.parse(item.to) - Date.parse(item.from)) * 100) / 86400000;
  console.log(i, diff < min15);
  item.width = width;
  if (diff < min15) {
    const resItem = result.pop();
    if (Array.isArray(resItem)) {
      resItem.push(item);
      resItem.to = item.to;
      resItem.width = resItem.reduce((acc, item) => {
        return acc + item.width;
      }, 0);
      result.push(resItem);
    } else {
      const newResultItem: any = [resItem, item];
      newResultItem.from = resItem?.from;
      newResultItem.to = item.from;
      newResultItem.width =
        ((Date.parse(newResultItem.to) - Date.parse(newResultItem.from)) *
          100) /
        86400000;
      result.push(newResultItem);
    }
  } else {
    const resItem = result.pop();
    const spaceWidth = (diff * 100) / 86400000;
    const space = { width: spaceWidth, isSpace: true, from: "", to: "" };
    result.push(resItem as DataItemProps, space, item);
  }
}
const Main = () => {
  return (
    <div className="container">
      <Stats>
        <h4>{date}</h4>
        <p>{data.length} visits</p>
      </Stats>
      <Bar data={result}></Bar>
    </div>
  );
};
const Stats = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export default Main;
