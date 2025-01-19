import React from "react";

const Color = (props) => {
  const { colorData } = props;
  console.log(colorData);

  const listStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    padding: 0,
    listStyleType: "none",
  };

  const itemStyle = {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    backgroundColor: "red", // Default background color
  };

  return (
    <ul style={listStyle}>
      {colorData &&
        colorData.map((item, index) => {
          return (
            <li
              key={index}
              style={{
                ...itemStyle,
                backgroundColor: item?.title || "red", // Use item color if available
              }}
            ></li>
          );
        })}
    </ul>
  );
};

export default Color;
