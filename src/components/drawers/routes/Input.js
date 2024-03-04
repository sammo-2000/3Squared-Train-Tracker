import React from "react";
import { Input } from "antd";
import Icon from "../../Icons.js";

const MyInput = ({ placeholder, onChange, icon, size, style }) => {
  return (
    <Input
      placeholder={placeholder || "Search Routes"}
      allowClear
      size={size || "large"}
      prefix={icon || <Icon iconName="search" />}
      onChange={onChange}
      style={
        style || {
          borderBottom: "1px solid rgba(5, 5, 5, 0.06)",
          marginTop: "-1px",
          borderRight: "none",
          borderLeft: "none",
          borderRadius: "0",
          padding: "1rem 1rem",
        }
      }
    />
  );
};

export default MyInput;
