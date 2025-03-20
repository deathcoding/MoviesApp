import { Spin } from "antd";

export default function LoadingSpin() {
  const contentStyle = {
    padding: 50,
    marginBottom: "12px",
    height: "70vh",
    background: "rgb(255, 255, 255)",
    borderRadius: 4,
  };

  return (
    <Spin tip="Загрузка, подождите" size="large">
      <div style={contentStyle}></div>
    </Spin>
  );
}
