"use client";
import { useSidebarStore } from "@/config/providers/SideBarStoreProvider";
import { IoMenuSharp } from "react-icons/io5";

type HamburgerToggleProps = {};
const HamburgerToggle: React.FC<HamburgerToggleProps> = ({}) => {
  const { toggle } = useSidebarStore((state) => state);

  return (
    <button
      id="mob__bar"
      className="[appearance:none]"
      onClick={() => toggle()}
    >
      <IoMenuSharp size={"30"} />
    </button>
  );
};

export default HamburgerToggle;
