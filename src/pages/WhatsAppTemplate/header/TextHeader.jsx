import Input, { InputLabel } from "@/shared/Input";
import useStore from "@/store/store";

const TextHeader = () => {
  const errors = useStore((state) => state.errorValidation);
  const { changeComponents, template } = useStore((state) => state);

  const headerState = template?.components.find((c) => c.type === "HEADER");

  const headerIndex = template?.components.indexOf(headerState);
  const headerErrors = errors?.components?.[headerIndex] || null;

  return (
    <InputLabel label="Text" htmlFor="text">
      <Input
        type="text"
        error={headerErrors}
        id="text"
        value={headerState?.value?.text}
        onChange={(e) => {
          changeComponents({ ...headerState, value: { text: e.target.value } });
        }}
        placeholder="Header text"
      />
    </InputLabel>
  );
};

export default TextHeader;
