import React from "react";
import styled from "styled-components";
import StampProps from "./interfaces";
export const Stamp = ({ width, isSpace, info, index }: StampProps) => {
  const [isShown, setIsShown] = React.useState<boolean>(false);

  return (
    <>
      <Marker
        index={index}
        onMouseEnter={() => {
          setIsShown(true);
        }}
        onMouseLeave={() => {
          setIsShown(false);
        }}
        width={width}
        isSpace={isSpace}
      >
        {!isSpace && (
          <Info isShown={isShown} isSpace={isSpace}>
            {<p>{info}</p>}
          </Info>
        )}
      </Marker>
    </>
  );
};
const Marker = styled.div<StampProps>`
  box-sizing: border-box;
  border-radius: 30px;
  background-color: ${(props) =>
    props.isSpace ? "transparent" : "aquamarine"};
  height: 26px;
  width: ${(props) => props.width + "%"};
  min-width: ${(props) => (props.isSpace ? "unset" : "26px")};
  display: inline-block;
  border: ${(props) => (props.isSpace ? "none" : "1px solid #000")};
  position: relative;
  transform: ${(props) => "translateX(-" + props.index * 18 + "px)"};
`;
const Info = styled.div<any>`
  background-color: #fff;
  border: 1px solid #000;
  display: ${(props) => (props.isShown ? "block" : "none")};
  text-align: center;
  position: absolute;
  top: -100px;
  left: 50%;
  transform: translateX(-50%);
`;
