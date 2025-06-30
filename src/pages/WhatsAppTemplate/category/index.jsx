import MarketingIcon from "@/assets/svg/MarketingIcon";
import UtilityIcon from "@/assets/svg/UtilityIcon";
import Title from "@/components/Title";
import useStore from "@/store/store";
import Desc from "@/components/Desc";
import Board from "@/shared/Board";

import { useState } from "react";

const TemplateCategory = () => {
  const store = useStore((state) => state);
  const { template, changeValue } = store;
  const categories = [
    {
      value: "MARKETING",
      name: "Marketing",
      description:
        "Send promotions and information about your products, services or business.",
      icon: <MarketingIcon active={template.category == "MARKETING"} />,
    },
    {
      value: "UTILITY",
      name: "Utility",
      description: "Send messages about an existing order or account.",
      icon: <UtilityIcon active={template.category == "UTILITY"} />,
    },
  ];

  return (
    <div className="flex flex-col gap-2 mt-2">
      <Title>Category</Title>

      <Desc>Choose your message template</Desc>
      <Board className="p-4 flex flex-col gap-3">
        {categories.map((c) => (
          <div
            key={c.value}
            onClick={() => changeValue("category", c.value)}
            className={`flex items-center gap-4 p-4 bg-blue-100 hover:bg-gray-200 rounded-lg cursor-pointer ${
              template.category === c.value ? "!bg-main-100" : ""
            }`}
          >
            <div>{c.icon}</div>
            <div className="flex flex-col items-start ">
              <span className=" font-medium max-[700px]:!text-[1.3rem]">
                {c.name}
              </span>
              <span className="text-xs text-font-200 max-[700px]:!text-[1.2rem]">
                {c.description}
              </span>
            </div>
          </div>
        ))}
      </Board>
    </div>
  );
};

export default TemplateCategory;
