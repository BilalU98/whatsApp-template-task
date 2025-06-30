const Board = ({ children, className = "" }) => {
  return <div className={`bg-white p-4 ${className}`}> {children}</div>;
};

export default Board;
