const Button = ({ children, type = "main", size = "md", ...props }) => {
  const buttonStyles = {
    main: "bg-main-500 text-white hover:bg-main-600",
    outline:
      "bg-transparent border border-main-500 text-main-500 hover:bg-main-500 hover:text-white",
  };

  const buttonSizes = {
    sm: "px-4 py-2 text-[0.7rem]",
    md: "px-4 py-2 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={`${buttonStyles[type]} ${buttonSizes[size]} rounded cursor-pointer flex gap-2 items-center justify-center min-w-23 transition-colors duration-200`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
