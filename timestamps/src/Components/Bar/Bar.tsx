import React from "react";
import { styled } from "styled-components";
import Interval from "../Interval/Interval";
import { DataItemProps } from "../Main/interafces";
const Bar = ({ data }: { data: DataItemProps[] }) => {
  console.log("data", data);
  return (
    <Body>
      {data.map((item, index) => {
        if (Array.isArray(item)) {
        }
        return <Interval TimeStamp={item} />;
      })}
    </Body>
  );
};
const Body = styled.div`
  max-width: 100%;
  background-color: rgba(3, 3, 3, 0.2);
  border-radius: 20px;
  height: 30px;
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 50px;
  padding: 0 5px;
`;
export default Bar;
