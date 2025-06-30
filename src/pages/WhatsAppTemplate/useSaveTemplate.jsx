import useStore from "@/store/store";
import templateValidation from "@/validations/template";

const useSaveTemplate = () => {
  const template = useStore((state) => state.template);
  const addErrorValidation = useStore((state) => state.addErrorValidation);

  const saveTemplateHandler = () => {
    const result = templateValidation.safeParse(template);

    if (!result.success) {
      const errors = result.error?.format();
      console.log({ errors });

      addErrorValidation(errors);
    } else {
      addErrorValidation({});
      alert(JSON.stringify({ template }));
    }
  };

  return { saveTemplateHandler };
};

export default useSaveTemplate;
