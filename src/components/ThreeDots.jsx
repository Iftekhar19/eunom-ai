import * as React from "react"
const ThreeDots = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      stroke="#292D32"
      strokeWidth={1.44}
      d="M2.72 8c0-.335.278-.613.613-.613.336 0 .614.278.614.613a.617.617 0 0 1-.614.614A.617.617 0 0 1 2.72 8ZM12.053 8c0-.335.278-.613.613-.613.336 0 .614.278.614.613a.617.617 0 0 1-.614.614.617.617 0 0 1-.613-.614ZM7.387 8c0-.335.278-.613.613-.613.336 0 .614.278.614.613A.617.617 0 0 1 8 8.614.617.617 0 0 1 7.387 8Z"
    />
  </svg>
)
export default ThreeDots
