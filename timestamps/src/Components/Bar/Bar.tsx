import React from "react";
import { styled } from "styled-components";
import Interval from "../Interval/Interval";
import { TimeStamp, TimeStampProp } from "../Main/interafces";
const Bar = ({ data }: { data: TimeStampProp[] }) => {
  return (
    <Body>
      {data.map((item, index) => {
        return <Interval TimeStamp={item} />;
      })}
    </Body>
  );
};
const Body = styled.div`
  max-width: 100%;
  background-color: rgba(3, 3, 3, 0.2);
  border-radius: 20px;
  height: 40px;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 10px;
  margin-top: 50px;
`;
export default Bar;
