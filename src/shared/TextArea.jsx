const TextArea = ({ error = false, className, ...props }) => {
  const errorStyle = error ? " border-red-500" : "";

  return (
    <textarea
      className={`border w-full h-25 border-border-100 rounded-lg p-2 outline-none text-sm max-[700px]:!text-[1.3rem] max-[700px]:!h-40 ${errorStyle} ${className}`}
      {...props}
    />
  );
};

export default TextArea;
