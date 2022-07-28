export default function ButtonComments({ children, ...props }) {
  return (
    <button className="selectButton" {...props}>
      {children}
    </button>
  );
}
