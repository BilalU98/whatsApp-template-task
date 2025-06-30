import { parsePhoneNumberFromString } from "libphonenumber-js";
import Input, { InputLabel } from "@/shared/Input";
import Selection from "@/shared/Selection";
import useStore from "@/store/store";
import countries from "@/utils/countries";
import { useLayoutEffect, useState } from "react";
import Flag from "react-world-flags";

const ButtonPhone = ({ index, buttonsTypes }) => {
  const changeComponents = useStore((state) => state.changeComponents);
  const components = useStore((state) => state.template.components);
  const errors = useStore((state) => state.errorValidation);
  const buttonState = useStore((state) =>
    state.template.components.find((c) => c.type === "BUTTONS")
  );

  const buttonsIndex = components?.indexOf(buttonState);
  const buttonError =
    errors?.components?.[buttonsIndex]?.buttons?.[index] || {};

  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneCode, setPhoneCode] = useState({});

  const buttonsCALL = buttonState?.buttons?.find(
    (b, idx) => idx === index && (b.type = "CALL")
  );

  const countriesOptions = countries.map((country) => ({
    value: country.phoneCode,
    code: country.code,
    label: (
      <div className="flex items-center gap-1">
        <Flag className="w-5 max-[700px]:!w-8" code={country.code} />
        <span className=" text-xs !text-transparent absolute max-[700px]:!text-[1.2rem] ">
          ({country.phoneCode})
        </span>
      </div>
    ),
  }));

  const buttonValue = () => {
    const button = buttonsTypes.find((b) => b.value === "CALL");
    return button;
  };

  //   add default phone code and number
  // This will run only once when the component mounts (if we fetch template data to view it or edit it)
  useLayoutEffect(() => {
    const phone = parsePhoneNumberFromString(buttonsCALL?.value?.phone_number);

    const phoneCode =
      countriesOptions.find((c) => c.code == phone?.country) ||
      countriesOptions[0];
    const number = phone?.nationalNumber || "";

    setPhoneCode(phoneCode);
    setPhoneNumber(number);
  }, []);

  console.log({ buttonError });

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
            if (value.value == "CALL") return;

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
          value={buttonsCALL.text}
          error={buttonError?.text}
          onChange={(e) => {
            changeComponents({
              ...buttonState,
              buttons: buttonState.buttons.map((btn, idx) =>
                idx === index ? { ...buttonsCALL, text: e.target.value } : btn
              ),
            });
          }}
        />
      </InputLabel>

      <InputLabel
        label="Phone Number"
        className="w-full"
        htmlFor={`PhoneNumber-${index}`}
      >
        <div className="flex flex-1 items-center gap-2">
          <Selection
            options={countriesOptions}
            value={phoneCode}
            id={`country-${index}`}
            onChange={(value) => {
              setPhoneCode(value);
              setPhoneNumber("");
              changeComponents({
                ...buttonState,
                buttons: buttonState.buttons.map((btn, idx) =>
                  idx === index
                    ? {
                        ...buttonsCALL,
                        value: { phone_number: value.value },
                      }
                    : btn
                ),
              });
            }}
            controlClassName="!w-20 max-[700px]:!w-40 "
            placeholder=""
          />

          <Input
            type="phone"
            className="flex-1"
            id={`PhoneNumber-${index}`}
            placeholder={`(${phoneCode.value}) xxxxxxxx`}
            value={phoneNumber}
            error={buttonError?.value?.phone_number}
            onChange={(e) => {
              const phone = `${phoneCode.value}${e.target.value}`;
              setPhoneNumber(e.target.value);
              changeComponents({
                ...buttonState,
                buttons: buttonState.buttons.map((btn, idx) =>
                  idx === index
                    ? {
                        ...buttonsCALL,
                        value: { phone_number: phone },
                      }
                    : btn
                ),
              });
            }}
          />
        </div>
      </InputLabel>
    </>
  );
};

export default ButtonPhone;
