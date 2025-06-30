import Input, { InputLabel } from "@/shared/Input";
import Selection from "@/shared/Selection";
import useStore from "@/store/store";

const ButtonURL = ({ index, buttonsTypes }) => {
  const changeComponents = useStore((state) => state.changeComponents);
  const components = useStore((state) => state.template.components);
  const errors = useStore((state) => state.errorValidation);
  const buttonState = useStore((state) =>
    state.template.components.find((c) => c.type === "BUTTONS")
  );

  const buttonsURL = buttonState?.buttons?.find(
    (b, idx) => idx === index && b.type === "URL"
  );

  const buttonsIndex = components?.indexOf(buttonState);
  const buttonError =
    errors?.components?.[buttonsIndex]?.buttons?.[index] || {};

  const buttonValue = () => {
    const button = buttonsTypes.find((b) => b.value === "URL");
    return button;
  };

  return (
    <>
      <InputLabel
        label="Button Type"
        htmlFor="ButtonType"
        className="!w-60 max-[700px]:!w-full"
      >
        <Selection
          menuPlacement="top"
          options={buttonsTypes}
          value={buttonValue()}
          onChange={(value) => {
            if (value.value == "URL") return;

            const buttons = buttonState.buttons?.map((_, idx) =>
              idx != index ? _ : value.defaultValue
            );
            changeComponents({
              ...buttonState,
              buttons,
            });
          }}
        />
      </InputLabel>

      <InputLabel
        label="Button Text"
        htmlFor={`ButtonText-${index}`}
        className="!w-60 max-[700px]:!w-full"
      >
        <Input
          type="text"
          id={`ButtonText-${index}`}
          placeholder="Button Text"
          error={buttonError?.text}
          value={buttonsURL.text}
          onChange={(e) => {
            changeComponents({
              ...buttonState,
              buttons: buttonState.buttons.map((btn, idx) =>
                idx === index ? { ...buttonsURL, text: e.target.value } : btn
              ),
            });
          }}
        />
      </InputLabel>

      <InputLabel label="Website URL" htmlFor="WebsiteURL" className="w-full">
        <Input
          type="text"
          id="WebsiteURL"
          placeholder="Website URL"
          value={buttonsURL.value.url}
          error={buttonError?.value?.url}
          onChange={(e) => {
            const newButtons = buttonState.buttons.map((btn, idx) =>
              idx === index
                ? { ...buttonsURL, value: { url: e.target.value } }
                : btn
            );

            changeComponents({
              ...buttonState,
              buttons: newButtons,
            });
          }}
        />
      </InputLabel>
    </>
  );
};

export default ButtonURL;
