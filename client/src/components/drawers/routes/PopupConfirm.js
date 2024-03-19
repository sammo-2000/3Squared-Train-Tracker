import React from "react";
import { Popconfirm } from "antd";

const MyPopupConfirm = ({
  children,
  title,
  description,
  onConfirm,
  onCancel,
  okText,
  cancelText,
}) => {
  return (
    <Popconfirm
      icon={null}
      title={title || null}
      description={description || null}
      onConfirm={onConfirm || null}
      onCancel={onCancel || null}
      okText={okText || "Confirm"}
      cancelText={cancelText || "Cancel"}
    >
      {children}
    </Popconfirm>
  );
};

export default MyPopupConfirm;
