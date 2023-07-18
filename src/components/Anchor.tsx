import React from "react";

function Anchor(
  props: React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >
) {
  const { className = "", children, ...restAtrributes } = props;
  return (
    <a
      className={`inline-block dark:text-white py-2 px-4 rounded cursor-pointer border border-[#4db5ff] transition-all duration-400 ease-in hover:bg-white hover:text-[#4db5ff] hover:border-transparent ${className}`}
      {...restAtrributes}
    >
      {children}
    </a>
  );
}

export default Anchor;
