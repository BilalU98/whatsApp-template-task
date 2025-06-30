import Desc from "@/components/Desc";
import Title from "@/components/Title";
import Board from "@/shared/Board";
import TextArea from "@/shared/TextArea";
import useStore from "@/store/store";

const TemplateBody = () => {
  const store = useStore((state) => state);
  const errors = useStore((state) => state.errorValidation);

  const { template, changeComponents } = store;
  const components = template.components;
  const bodyState = components.find((c) => c.type === "BODY");
  const bodyIndex = components.indexOf(bodyState);
  const bodyErrors = errors?.components?.[bodyIndex] || null;

  return (
    <div className="flex flex-col gap-2 mt-2">
      <Title>Body</Title>

      <Desc>
        Enter the text of your message in the language you’ve selected
      </Desc>
      <Board className="p-4">
        <TextArea
          error={bodyErrors}
          placeholder="Template message"
          value={bodyState?.text}
          onChange={(e) => {
            changeComponents({
              ...bodyState,
              text: e.target.value,
            });
          }}
        />
      </Board>
    </div>
  );
};

export default TemplateBody;
