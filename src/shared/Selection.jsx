import Select from "react-select";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    minHeight: "2.5rem", // e.g., 2.5rem = 40px if base font-size is 16px
    height: "2.5rem",
    "@media (max-width: 700px)": {
      minHeight: "4rem",
      height: "4rem",
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    height: "2.5rem",
    "@media (max-width: 700px)": {
      minHeight: "4rem",
      height: "4rem",
    },
    padding: "0 0.5rem", // adjust horizontal padding
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: "2.5rem",
    "@media (max-width: 700px)": {
      height: "4rem",
    },
  }),
  input: (provided) => ({
    ...provided,
    margin: 0,
    padding: 0,
  }),
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
};
const Selection = ({ controlClassName = "", ...props }) => (
  <Select
    styles={customStyles}
    menuPortalTarget={document.body}
    classNames={{
      control: () =>
        ` min-h-20 bg-white border !text-sm  !border-border-100 !rounded-lg !ring-0 shadow-none ${controlClassName} max-[700px]:!text-[1.2rem]`,

      option: ({ isFocused, isSelected }) =>
        `cursor-pointer px-3 py-2 text-sm  ${
          isSelected
            ? "!bg-main-500 text-white"
            : isFocused
            ? "!bg-main-100 text-main-900"
            : "text-gray-900"
        }`,

      singleValue: () => "!text-font-100",
    }}
    components={{
      IndicatorSeparator: () => null,
    }}
    menuPlacement="auto"
    {...props}
  />
);

export default Selection;
