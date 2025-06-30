import { useState } from "react";
import Desc from "@/components/Desc";
import Title from "@/components/Title";
import Board from "@/shared/Board";
import Tabs from "@/shared/Tabs";
import TextHeaderIcon from "@/assets/svg/TextHeaderIcon";
import ImageHeaderIcon from "@/assets/svg/ImageHeaderIcon";
import TextHeader from "./TextHeader";
import ImageUploader from "./ImageHeader";
import useStore from "../../../store/store";

const TemplateHeader = () => {
  // we use multiple useStore to prevent re-rendering (allow re-rendering only when below specific state changes)
  const removeComponent = useStore((state) => state.removeComponent);
  const addComponent = useStore((state) => state.addComponent);
  const headerState = useStore((state) =>
    state.template.components.find((c) => c.type === "HEADER")
  );

  const activeTab = headerState?.format ?? "NONE";

  const items = [
    { value: "NONE", name: "None", icon: null, defaultValue: null },
    {
      value: "TEXT",
      name: "Text",
      icon: <TextHeaderIcon />,
      defaultValue: {
        type: "HEADER",
        format: "TEXT",
        value: { text: "" },
      },
    },
    {
      value: "IMAGE",
      name: "Image",
      icon: <ImageHeaderIcon />,
      defaultValue: {
        type: "HEADER",
        format: "IMAGE",
        value: {
          url: null,
        },
      },
    },
  ];

  const setActiveTabHandler = (FullValue) => {
    if (!FullValue || FullValue.value === activeTab) return;

    if (FullValue.value === "NONE") {
      removeComponent("HEADER");
    } else {
      addComponent(FullValue.defaultValue);
    }
  };

  return (
    <div className="flex flex-col gap-2 mt-2">
      <Title>Header</Title>
      <Desc>Highlight your brand here, use images or videos, to stand out</Desc>

      <Board>
        <Tabs
          {...{
            items,
            activeTab,
            setActiveTab: setActiveTabHandler,
            returnFullValue: true,
          }}
        />

        {/* tabs body components */}
        <div className="mt-4">
          {activeTab === "TEXT" && <TextHeader />}
          {activeTab === "IMAGE" && <ImageUploader />}
        </div>
      </Board>
    </div>
  );
};

export default TemplateHeader;
