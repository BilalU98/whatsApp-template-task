import Desc from "@/components/Desc";
import Title from "@/components/Title";
import Board from "@/shared/Board";
import Input from "@/shared/Input";
import useStore from "@/store/store";

const TemplateFooter = () => {
  const changeComponents = useStore((state) => state.changeComponents);

  const footerState = useStore((state) =>
    state.template.components.find((c) => c.type === "FOOTER")
  );

  return (
    <div className="flex flex-col gap-2 mt-2">
      <Title>Footer</Title>

      <Desc>
        Use this section for optional details like disclaimers, contact info, or
        additional context.
      </Desc>
      <Board className="p-4">
        <Input
          placeholder="Enter Text"
          value={footerState?.text}
          onChange={(e) => {
            changeComponents({
              ...footerState,
              text: e.target.value,
            });
          }}
        />
      </Board>
    </div>
  );
};

export default TemplateFooter;
