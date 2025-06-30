const Tabs = ({
  items = [],
  activeTab,
  setActiveTab,
  returnFullValue = false,
}) => {
  const activeClass = "bg-white ";
  return (
    <div className="flex gap-2 bg-blue-100 rounded p-1 w-fit ">
      {items.map((item) => (
        <div
          key={item.name}
          onClick={() => {
            // If returnFullValue is true, set the full item as active tab (e.g., for complex objects)
            if (returnFullValue) {
              setActiveTab(item);
              return;
            }
            // Otherwise, just set the value of the item as active tab
            setActiveTab(item.value);
          }}
          className={`flex justify-center items-center transition-all py-1 rounded gap-2 p-2 px-4 min-w-30 cursor-pointer ${
            activeTab == item?.value ? activeClass : ""
          }`}
        >
          <div>{item?.icon}</div>
          <div className=" font-medium max-[700px]:!text-[1.2rem]">
            {item.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tabs;
