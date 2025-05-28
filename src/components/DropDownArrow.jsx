import * as React from "react"
const DropDownArrow = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      stroke="#718096"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="m16.6 7.459-5.433 5.433a1.655 1.655 0 0 1-2.333 0L3.4 7.46"
    />
  </svg>
)
export default DropDownArrow
