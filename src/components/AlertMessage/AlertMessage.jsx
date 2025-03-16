import { Alert } from "antd";

export default function AlertMessage({ text }) {
  return <Alert message="Error" description={text} type="error" />;
}
