const Padding = ({ children, className = "" }) => {
  return <div className={`px-6 ${className} max-[700px]:py-4`}>{children}</div>;
};

export default Padding;
