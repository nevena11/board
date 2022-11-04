import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';

// This will create / edit item
export const CreateOrEdit = ({ 
  setBoardItems, 
  boardItems, 
  handleClose, 
  handleShow, 
  show,
  formValue,
  setFormValue,
  selectedUser,
  setSelectedUser,
  selectedStatus, 
  setSelectedStatus
}) => {
  // This state will be used to validate form
  const [validated, setValidated] = useState(false);

  // On select user set value for the user
  const onSelectUser = (newSelectedUser) => {
    setFormValue({ ...formValue, user: newSelectedUser })
    setSelectedUser(newSelectedUser);
  }

  // On select status set value for the status
  const onSelectStatus = (newSelectedStatus) => {
    setFormValue({ ...formValue, column: newSelectedStatus, status: newSelectedStatus.replaceAll(" ", "").toUpperCase() })
    setSelectedStatus(newSelectedStatus);
  }

  // This function will be used to submit value
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    setValidated(true);

    // If id is not set or it is 0 then we should create new item. If it is set edit will be done
    if (!formValue.id) {
      const newItem = { ...formValue, id: Math.max(...boardItems.map(item => item.id)) + 1}
      setBoardItems([...boardItems, newItem]);
    } else {
      const items = boardItems.filter(item => item.id !== formValue.id);
      setBoardItems([...items, {...formValue}]);
    }

    handleClose();
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Create issue
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create / Edit Item</Modal.Title>
        </Modal.Header>
        <Form validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.TitleInput">
            <Form.Label>Title:</Form.Label>
            <Form.Control 
              value={formValue?.title}
              onChange={e => setFormValue({ ...formValue, title: e.target.value })}
              autoFocus 
              required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.DescriptionInput">
            <Form.Label>Description</Form.Label>
            <Form.Control 
              value={formValue?.content}
              onChange={e => setFormValue({ ...formValue, content: e.target.value })}
              as="textarea" 
              rows={3} 
              required />
          </Form.Group>
          <Form.Group>
            <Dropdown id="user" onSelect={onSelectUser}>
              <Dropdown.Toggle>
                {selectedUser}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="Nevena" active>Nevena</Dropdown.Item>
                <Dropdown.Item eventKey="Jovana">Jovana</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
          <Form.Group>
            <Dropdown id="status" onSelect={onSelectStatus}>
              <Dropdown.Toggle>
                {selectedStatus}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="To Do" active>To Do</Dropdown.Item>
                <Dropdown.Item eventKey="In Progress">In Progress</Dropdown.Item>
                <Dropdown.Item eventKey="Done">Done</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">Save</Button>
        </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
