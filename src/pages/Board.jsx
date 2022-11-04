import React, { useState } from "react";

import { BoardColumn } from "../components/BoardColumn";
import { BoardItem } from '../components/Item';

import { data, defaultCreateData } from "../data/data";
import { COLUMNS } from '../data/columns';
import { CreateOrEdit } from "../components/CreateOrEdit";

const Board = () => {
  // Set all board items
  const [boardItems, setBoardItems] = useState(data);
  // Set default data when create / edit item modal is opened
  const [formValue, setFormValue] = useState(defaultCreateData)
  // Set visibility of craete / edit modal
  const [show, setShow] = useState(false);
  // Set default user that will be present in create / edit modal
  const [selectedUser, setSelectedUser] = useState("Nevena")
  // Set default status that will be present in create / edit modal
  const [selectedStatus, setSelectedStatus] = useState("To Do")

  // This function will be used to close modal
  const handleClose = () => {
    // Set default value for create / edit modal
    setFormValue(defaultCreateData)
    // Set default value for user
    setSelectedUser("Nevena");
    // Set default value for status
    setSelectedStatus("To Do");
    // Turn off modal for create / edit
    setShow(false);
  }

  // This function will be used to open modal
  const handleShow = (data) => {
    if (data) {
      // If data is set then Edit mode will be active
      setFormValue(data);
      setSelectedUser(data?.user);
      setSelectedStatus(data?.column);
    }

    // Open modal window
    setShow(true);
  }

  // This will handle moving for the item
  const moveItemHandler = (dragIndex, hoverIndex) => {
    // Drag index is colum where item was and hover index is where next item place is
    const dragItem = boardItems[dragIndex];

    if (dragItem) {
      setBoardItems((prevState) => {
        const copiedStateArray = [...prevState];
        const prevItem = copiedStateArray.splice(hoverIndex, 1, dragItem);
        copiedStateArray.splice(dragIndex, 1, prevItem[0]);
        return copiedStateArray;
      });
    }
  };

  // This function will reder columns 
  const returnItemsForColumn = (columnName) => {
    return boardItems
      .filter((item) => item.column === columnName)
      .map((item, index) => (
        <BoardItem
          key={item.id}
          name={item.id}
          content={item.content}
          title={item.title}
          currentColumnName={item.column}
          setItems={setBoardItems}
          index={index}
          moveItemHandler={moveItemHandler}
          handleShowEdit={handleShow}
          user={item.user}
          item={item}
        />
      ));
  };

  // Default columns that exists
  const { TODO, INPROGRESS, DONE } = COLUMNS;

  return (
    <div>
      <CreateOrEdit 
        setBoardItems={setBoardItems} 
        boardItems={boardItems} 
        show={show} 
        handleClose={handleClose} 
        handleShow={() => handleShow(null)}
        formValue={formValue}
        setFormValue={setFormValue}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />
      <div className="container">
        <BoardColumn title={TODO}>
          {returnItemsForColumn(TODO)}
        </BoardColumn>
        <BoardColumn title={INPROGRESS}>
          {returnItemsForColumn(INPROGRESS)}
        </BoardColumn>
        <BoardColumn title={DONE}>
          {returnItemsForColumn(DONE)}
        </BoardColumn>
      </div>
    </div>
  );
}

export default Board;