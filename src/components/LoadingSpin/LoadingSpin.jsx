import { Spin } from "antd";

export default function LoadingSpin() {
  const contentStyle = {
    padding: 50,
    height: "70vh",
    background: "rgba(0, 0, 0, 0.05)",
    borderRadius: 4,
  };

  return (
    <Spin tip="Loading, please wait" size="large">
      <div style={contentStyle}></div>
    </Spin>
  );
}
