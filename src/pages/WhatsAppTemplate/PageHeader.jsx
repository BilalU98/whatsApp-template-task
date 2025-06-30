import SvgIcon from "../../assets/svg/PlusIcon";
import SaveIcon from "../../assets/svg/SaveIcon";
import Board from "../../shared/Board";
import Breadcrumb from "../../shared/Breadcrumb";
import Button from "../../shared/Button";
import Padding from "../../shared/Padding";

const PageHeader = ({ saveTemplateHandler }) => {
  return (
    <div className="PageHeader">
      <Board className="!p-0">
        <Padding className="flex justify-between items-center py-2">
          <h1 className=" text-xl font-semibold flex items-center gap-2">
            <SvgIcon /> New Template Message
          </h1>
          <Button onClick={saveTemplateHandler}>
            <SaveIcon />
            Save
          </Button>
        </Padding>
      </Board>
      <Breadcrumb items={["Templates", "New Template Message"]} />
    </div>
  );
};

export default PageHeader;
