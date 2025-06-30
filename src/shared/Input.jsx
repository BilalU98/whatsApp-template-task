const Input = ({ className, error = false, ...props }) => {
  const errorStyle = error ? " border-red-500" : "";
  return (
    <input
      className={`border w-full h-10 bg-white text-font-100 border-border-100 rounded-lg p-2 outline-none text-sm ${errorStyle} ${className} max-[700px]:h-15 max-[700px]:!text-[1.2rem]`}
      {...props}
    />
  );
};

export default Input;

export const InputLabel = ({
  className,
  children,
  isRequired = true,
  label = "",
  htmlFor,
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label
        htmlFor={htmlFor}
        className="text-sm font-medium max-[700px]:!text-[1.3rem] flex items-center gap-2"
      >
        {label}
        {isRequired && <span className="text-red-500"> *</span>}
      </label>

      {children}
    </div>
  );
};
