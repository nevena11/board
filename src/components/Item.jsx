import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { COLUMNS } from './../data/columns';
import BOARD_ITEM_TYPE from './../data/type';

export const BoardItem = ({
  name,
  index,
  currentColumnName,
  moveItemHandler,
  setItems,
  content,
  title,
  item,
  user,
  handleShowEdit
}) => {

  const changeItemColumn = (currentItem, columnName) => {
    setItems((prevState) => {
      return prevState.map((e) => {
        return {
          ...e,
          column: e.id === currentItem.name ? columnName : e.column
        };
      });
    });
  };

  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: BOARD_ITEM_TYPE,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveItemHandler(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: BOARD_ITEM_TYPE,
    item: { index, name, currentColumnName, type: BOARD_ITEM_TYPE },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (dropResult) {
        const { name } = dropResult;
        const { TODO, INPROGRESS, DONE } = COLUMNS;
        switch (name) {
          case TODO:
            changeItemColumn(item, TODO);
            break;
          case INPROGRESS:
            changeItemColumn(item, INPROGRESS);
            break;
          case DONE:
            changeItemColumn(item, DONE);
            break;
          default:
            break;
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0.4 : 1;

  drag(drop(ref));

  return (
    <div ref={ref} className="movable-item" style={{ opacity }} onClick={() => handleShowEdit(item)}>
      <h5>{title}</h5>
      <h6>({user})</h6>
      <div>{content}</div>
    </div>
  );
};