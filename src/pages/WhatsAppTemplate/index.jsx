import WhatsAppEmulator from "@/components/WhatsAppEmulator";
import TemplateCategory from "./category";
import TemplateButtons from "./buttons";
import TemplateDetails from "./details";
import Padding from "@/shared/Padding";
import PageHeader from "./PageHeader";
import TemplateFooter from "./footer";
import TemplateHeader from "./header";
import TemplateBody from "./body";
import Button from "@/shared/Button";
import useSaveTemplate from "./useSaveTemplate";

const WhatsAppTemplatePage = () => {
  const { saveTemplateHandler } = useSaveTemplate();
  return (
    <div className="flex flex-col h-screen">
      <PageHeader {...{ saveTemplateHandler }} />

      <div className="flex flex-1 min-h-0 overflow-hidden max-[700px]:flex-col max-[700px]:overflow-y-visible max-[700px]:min-h-fit">
        <Padding className="flex-1 min-h-0 overflow-hidden flex flex-col gap-2 max-[700px]:overflow-y-visible max-[700px]:min-h-fit">
          <div className="flex-1 min-h-0  overflow-y-auto  flex flex-col gap-10 pr-4 max-[700px]:overflow-y-visible max-[700px]:min-h-fit">
            <TemplateDetails />
            <TemplateCategory />
            <TemplateHeader />
            <TemplateBody />
            <TemplateFooter />
            <TemplateButtons />
          </div>
        </Padding>

        {/* Right side - Emulator */}
        <WhatsAppEmulator />
      </div>
      <Padding className="py-10">
        <Button onClick={saveTemplateHandler}>Save</Button>
      </Padding>
    </div>
  );
};

export default WhatsAppTemplatePage;
