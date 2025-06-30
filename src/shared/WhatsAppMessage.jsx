import WhatsAppBubble from "@/assets/svg/WhatsAppBubble";

const WhatsAppMessage = ({ children, dir = "ltr" }) => {
  return (
    <div className="relative w-full flex items-start">
      <WhatsAppBubble />
      <div className=" bg-white min-h-20   w-full translate-x-[-2px]  rounded-lg rounded-tl-none">
        <div className=" mt-auto  min-h-20 " dir={dir}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default WhatsAppMessage;
