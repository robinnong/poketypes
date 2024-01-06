import React from "react";

// This function component will unmount from the Game at the end of each animation
export const PlusOne = ({ unmount }) => {
  return (
    <span onAnimationEnd={unmount} className="plusOne animated fadeOutUp">
      +1
    </span>
  );
};
