import useStore from "@/store/store";
import languages from "@/lookups/languages";
import WhatsAppMessage from "@/shared/WhatsAppMessage";
import CallIcon from "@/assets/svg/CallIcon";
import EmulatorPhone from "@/assets/png/EmulatorPhone.png";
import WebIcon from "@/assets/svg/WebIcon";
const WhatsAppEmulator = () => {
  return (
    <div className="flex flex-col items-center justify-start">
      <p>Preview</p>

      <Emulator />
    </div>
  );
};

export default WhatsAppEmulator;

const Emulator = () => {
  const template = useStore((state) => state.template);
  const language = template.language;
  const header = template?.components?.find((c) => c.type == "HEADER");
  const footer = template?.components?.find((c) => c.type == "FOOTER");
  const body = template?.components?.find((c) => c.type == "BODY");
  const buttons = template?.components?.find((c) => c.type == "BUTTONS");

  const languageDetail = languages.find((l) => l.value == language);

  function getCurrentTime12h() {
    const now = new Date();
    return now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }
  return (
    <div className=" relative w-95 [&>img]:w-full ">
      <img src={EmulatorPhone} alt="" />

      <div className=" absolute top-[7rem] h-[70%] overflow-auto  hide-scrollbar left-[50%] translate-x-[-55%] min-w-[75%] ">
        {/* header and body and footer */}
        <WhatsAppMessage dir={languageDetail?.dir}>
          {/* header */}
          <div className="p-2">
            {/* text */}
            <h1 className=" font-medium ">{header?.value?.text}</h1>

            {/* image */}
            {header?.value?.url && (
              <div className="w-full h-40">
                <img
                  className="w-full h-full object-cover object-center"
                  src={header?.value?.url}
                  alt=""
                />
              </div>
            )}
          </div>

          {/* body */}
          <pre className="p-2 font-sans pt-2 whitespace-pre-wrap text-[0.9rem] ">
            {body?.text}
          </pre>

          {/* footer */}

          <div className="flex justify-between items-end p-2 ">
            <span className=" font-sans pt-2 flex-1 text-xs text-gray-600 truncate overflow-hidden whitespace-nowrap max-w-[12rem]">
              {footer?.text}
            </span>

            <span className="text-xs text-gray-600 justify-self-end">
              {getCurrentTime12h()}
            </span>
          </div>

          {/* buttons */}
          {buttons?.buttons?.length > 0 && (
            <div className=" border-t border-blue-100">
              {buttons?.buttons?.map((item) => (
                <div className=" flex items-center justify-center gap-1 p-2 first:border-b-1 first:border-blue-100">
                  {item.type == "CALL" ? <CallIcon /> : <WebIcon />}
                  <span className=" text-blue-500 max-w-[8rem] truncate overflow-hidden whitespace-nowrap">
                    {item?.text}
                  </span>
                </div>
              ))}
            </div>
          )}
        </WhatsAppMessage>
      </div>
    </div>
  );
};
