import { Anchor, ConfigProvider } from "antd";
import "./FilterButton.css";

export default function FilterButton({ setActiveFilter }) {
  const AnchorItems = [
    {
      key: "search",
      title: "Search",
      href: "#Search",
    },
    {
      key: "rated",
      title: "Rated",
      href: "#Rated",
    },
  ];

  function handleClick(e, link) {
    e.preventDefault();
    setActiveFilter(link.title);
  }

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
          onClick={handleClick}
          direction="horizontal"
          items={AnchorItems}
          className="anchor"
          affix={false}
        />
      </div>
    </ConfigProvider>
  );
}
