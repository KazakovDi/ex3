import React from "react";
import { TimeStampProp } from "../Main/interafces";
import styled from "styled-components";
const Interval = ({ TimeStamp }: { TimeStamp: TimeStampProp }) => {
  const from = Date.parse(TimeStamp.from);
  const to = Date.parse(TimeStamp.to);
  const options: any = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const formatter = Intl.DateTimeFormat("RU", options);
  const text = formatter.formatRange(from, to);
  const [isShown, setIsShown] = React.useState<boolean>(false);
  return (
    <Stamp
      onMouseEnter={() => {
        setIsShown(true);
      }}
      onMouseLeave={() => {
        setIsShown(false);
      }}
      width={TimeStamp.width}
      offset={TimeStamp.offset}
      left={TimeStamp.left}
    >
      <Info isShown={isShown}>
        <p>{text}</p>
      </Info>
    </Stamp>
  );
};

export default Interval;
interface Stamp {
  left: number;
  width: number;
  offset: number;
}
const Stamp = styled.div<Stamp>`
  border-radius: 30px;
  background-color: aquamarine;
  height: 36px;
  width: ${(props) => props.width + "%"};
  min-width: 36px;

  position: absolute;
  left: ${(props) => props.left}%;
  transform: ${(props) => "translateX(-" + props.offset + "px)"};
  border: 1px solid #000;
`;
const Info = styled.div<any>`
  background-color: #fff;
  border: 1px solid #000;
  position: absolute;
  top: -100px;
  left: 50%;
  transform: translateX(-50%);
  display: ${(props) => (props.isShown ? "block" : "none")};
  text-align: center;
`;
