import RightArrow from "../assets/svg/RightArrow";
import Padding from "./Padding";

const Breadcrumb = ({ items = [] }) => {
  return (
    <Padding className="py-2">
      <nav className="flex items-center gap-2 py-2">
        {items.map((item, index) => (
          <span key={item} className=" flex items-center gap-2 ">
            <span
              className={`text-gray-600 font-medium text-sm max-[700px]:!text-[1.2rem] ${
                index == items.length - 1 ? "text-gray-800" : ""
              }`}
            >
              {item}
            </span>
            {index < items.length - 1 && (
              <span className="">
                <RightArrow />
              </span>
            )}
          </span>
        ))}
      </nav>
    </Padding>
  );
};

export default Breadcrumb;
