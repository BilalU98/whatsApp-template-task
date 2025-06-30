import Input, { InputLabel } from "@/shared/Input";
import Selection from "@/shared/Selection";
import Title from "@/components/Title";
import useStore from "@/store/store";
import Desc from "@/components/Desc";
import Board from "@/shared/Board";
import languages from "@/lookups/languages";

const TemplateDetails = () => {
  const errors = useStore((state) => state.errorValidation);

  const store = useStore((state) => state);
  const { template, changeValue } = store;
  const selectedOption = languages.find(
    (option) => option.value === template.language
  );

  return (
    <div className="flex flex-col gap-2 mt-2">
      <Title>Template Details</Title>

      <Desc>Define your template name and language</Desc>
      <Board className="p-4">
        <div className="flex flex-col gap-2">
          <InputLabel label="Template Name" htmlFor="templateName">
            <Input
              error={errors?.name}
              type="text"
              id="templateName"
              maxLength={512}
              value={template.name}
              onChange={(e) =>
                changeValue("name", e.target.value.replace(/ /g, "_"))
              }
              placeholder="Template Name Max (512)"
            />
          </InputLabel>

          <InputLabel label="Language" htmlFor="language">
            <Selection
              placeholder="Select language"
              value={selectedOption}
              onChange={(option) => changeValue("language", option.value)}
              options={languages}
            />
          </InputLabel>
        </div>
      </Board>
    </div>
  );
};

export default TemplateDetails;
