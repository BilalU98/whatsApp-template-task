import DeleteIcon from "@/assets/svg/DeleteIcon";
import ButtonPhone from "./ButtonPhone";
import useStore from "@/store/store";
import ButtonURL from "./ButtonURL";

const ButtonComponent = () => {
  const changeComponents = useStore((state) => state.changeComponents);
  const removeComponent = useStore((state) => state.removeComponent);

  const buttonState = useStore((state) =>
    state.template.components.find((c) => c.type === "BUTTONS")
  );

  const buttons = buttonState?.buttons || [];

  const handleDelete = (idx) => {
    const newButtons = buttons.filter((_, index) => index !== idx);
    if (newButtons.length === 0) {
      // If no buttons left, remove the BUTTONS component
      removeComponent("BUTTONS");
    } else {
      changeComponents({
        ...buttonState,
        buttons: newButtons,
      });
    }
  };

  const buttonsTypes = [
    {
      value: "URL",
      defaultValue: {
        type: "URL",
        value: { url: "" },
      },
      label: "Visit Website",
    },
    {
      value: "CALL",
      defaultValue: {
        type: "CALL",
        value: { phone_number: "" }, // ex: +966512345678
      },
      label: "Phone Number",
    },
  ];

  return (
    <div className="flex flex-1 w-full flex-col gap-4 mt-4 ">
      {buttons.map((button, index) => (
        <div className="flex gap-2 items-center justify-center " key={index}>
          <div className=" flex-1 bg-blue-100 p-4 flex gap-2 items-center rounded-lg border border-blue-200 max-[700px]:flex-col ">
            {button.type === "URL" ? (
              <ButtonURL {...{ index, buttonsTypes }} />
            ) : (
              <ButtonPhone {...{ index, buttonsTypes }} />
            )}
          </div>

          <div
            className="w-6 h-6 hover:bg-red-100 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200"
            onClick={() => handleDelete(index)}
          >
            <DeleteIcon />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ButtonComponent;
