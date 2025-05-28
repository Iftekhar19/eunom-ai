import * as React from "react"
const SearchIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={44}
    height={44}
    fill="none"
    {...props}
  >
    <rect width={44} height={44} fill="#1B2559" rx={22} />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M21.34 27.28a5.94 5.94 0 1 0 0-11.88 5.94 5.94 0 0 0 0 11.88ZM27.61 28.6a.99.99 0 1 0 0-1.98.99.99 0 0 0 0 1.98Z"
    />
  </svg>
)
export default SearchIcon
