import React from "react";
import { DataItemProps } from "../Main/interafces";
import { Stamp } from "../Stamp/Stamp";
import styled from "styled-components";
const Interval = ({ TimeStamp }: { TimeStamp: DataItemProps }) => {
  const options: any = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  const formatter = Intl.DateTimeFormat("RU", options);
  let Time = "";
  if (!Array.isArray(TimeStamp) && !TimeStamp.isSpace) {
    Time = formatter.formatRange(
      Date.parse(TimeStamp.from),
      Date.parse(TimeStamp.to)
    );
  }
  {
    if (Array.isArray(TimeStamp)) {
      return (
        <Group leng={TimeStamp.length} width={TimeStamp.width || 0}>
          {TimeStamp.map((item, index) => {
            const from = Date.parse(item.from);
            const to = Date.parse(item.to);
            const text = formatter.formatRange(from, to);
            const devider = TimeStamp.width || 1;
            const itemWidth = (item.width * 100) / devider;
            return (
              <Stamp
                index={index}
                width={itemWidth}
                isSpace={item.isSpace}
                info={text}
              ></Stamp>
            );
          })}
        </Group>
      );
    } else {
      return (
        <Stamp
          index={0}
          width={TimeStamp.width || 0}
          isSpace={TimeStamp.isSpace || false}
          info={Time}
        ></Stamp>
      );
    }
  }
};
interface IGroup {
  leng: number;
  width: number;
}
const Group = styled.div<IGroup>`
  width: ${(props) => "calc(" + props.width + "%)"};
  min-width: ${(props) => 18 + props.leng * 8}px;
  display: flex;
`;
export default Interval;
