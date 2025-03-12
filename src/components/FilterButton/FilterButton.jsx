import { Anchor } from "antd";
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
    <div className="anchor-wrapper">
      <Anchor
        direction="horizontal"
        items={AnchorItems}
        className="anchor"
        affix={false}
      />
    </div>
  );
}
