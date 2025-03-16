import { Anchor, ConfigProvider } from "antd";
import "./FilterButton.css";

export default function FilterButton() {
  const AnchorItems = [
    {
      key: "search",
      title: "Search",
      href: "#part-1",
    },
    {
      key: "rated",
      title: "Rated",
      href: "#part-2",
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          /* here is your global tokens */
          colorPrimary: "#DA70D6",
          colorText: "white",
          fontSize: "22px",
        },
      }}
    >
      <div className="anchor-wrapper">
        <Anchor
          direction="horizontal"
          items={AnchorItems}
          className="anchor"
          affix={false}
        />
      </div>
    </ConfigProvider>
  );
}
