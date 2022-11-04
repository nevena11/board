import React from "react";
import { useDrop } from "react-dnd";
import BOARD_ITEM_TYPE from './../data/type';

// This functional component will render columns
export const BoardColumn = ({ children, title }) => {
  // This is used from react-dnd library to allow drop on some column
  // eslint-disable-next-line no-unused-vars
  const [_, drop] = useDrop({
    accept: BOARD_ITEM_TYPE,
    drop: () => ({ name: title })
  });

  // Return colum with children
  return (
    <div ref={drop} className="column" >
      <p>{title}</p>
      {children}
    </div>
  );
};