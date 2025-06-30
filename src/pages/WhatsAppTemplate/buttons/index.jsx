import CallToActionIcon from "@/assets/svg/CallToActionIcon";
import ButtonComponent from "./ButtonComponent";
import Title from "@/components/Title";
import Desc from "@/components/Desc";
import useStore from "@/store/store";
import Board from "@/shared/Board";
import Tabs from "@/shared/Tabs";

const TemplateButtons = () => {
  // we use multiple useStore to prevent re-rendering (allow re-rendering only when below specific state changes)
  const removeComponent = useStore((state) => state.removeComponent);
  const addComponent = useStore((state) => state.addComponent);
  const buttons = useStore((state) =>
    state.template.components.find((c) => c.type === "BUTTONS")
  );

  const activeTab = buttons ? "ACTION" : "NONE";
  const items = [
    { value: "NONE", name: "None", icon: null },
    {
      value: "ACTION",
      name: "Call to actions",
      icon: <CallToActionIcon />,
      defaultValue: {
        type: "BUTTONS",
        buttons: [
          {
            type: "URL",
            text: "",
            value: {
              url: "",
            },
          },
          {
            type: "CALL",
            text: "",
            value: {
              phone_number: "", // ex: +96277777777
            },
          },
        ],
      },
    },
  ];

  const setActiveTabHandler = (FullValue) => {
    if (!FullValue || FullValue.value === activeTab) return;

    if (FullValue.value === "NONE") {
      removeComponent("BUTTONS");
    } else {
      addComponent(FullValue.defaultValue);
    }
  };

  return (
    <div className="flex flex-col gap-2 mt-2">
      <Title>Buttons</Title>
      <Desc>
        Create buttons that let your customers respond to your message or take
        an action.
      </Desc>

      <Board>
        <Tabs
          {...{
            items,
            activeTab,
            setActiveTab: setActiveTabHandler,
            returnFullValue: true,
          }}
        />

        {activeTab === "ACTION" && <ButtonComponent />}
      </Board>
    </div>
  );
};

export default TemplateButtons;
