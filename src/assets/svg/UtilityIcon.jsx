const UtilityIcon = ({ active = false }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="50"
    height="50"
    className="w-12 h-12"
    fill="none"
    viewBox="0 0 50 50"
  >
    <rect width="50" height="50" fill="#fff" rx="25"></rect>
    <path
      stroke={active ? "#9B7CB7" : "#000"}
      strokeWidth="1.5"
      d="M31.75 22.71v-.705C31.75 18.136 28.726 15 25 15s-6.75 3.136-6.75 7.005v.705a4.4 4.4 0 0 1-.692 2.375L16.45 26.81c-1.011 1.575-.239 3.716 1.52 4.214a25.8 25.8 0 0 0 14.06 0c1.759-.498 2.531-2.639 1.52-4.213l-1.108-1.725a4.4 4.4 0 0 1-.693-2.375Z"
    ></path>
    <path
      stroke={active ? "#9B7CB7" : "#000"}
      strokeLinecap="round"
      strokeWidth="1.5"
      d="M20.5 32c.655 1.748 2.422 3 4.5 3s3.845-1.252 4.5-3"
    ></path>
  </svg>
);

export default UtilityIcon;
