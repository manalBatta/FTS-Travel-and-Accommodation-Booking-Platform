import React, { useState } from "react";
import "./PopupForm.css"; // Add CSS for centering and styling
import Button from "../Button/Button";
// Assuming you have a reusable Button component

interface PopupFormProps {
  isVisible: boolean;
  onClose: () => void;
  onUpdate: (name: string, description: string) => void;
  cityName?: string;
  cityDescription?: string;
}

const PopupForm: React.FC<PopupFormProps> = ({
  isVisible,
  onClose,
  onUpdate,
  cityName = "",
  cityDescription = "",
}) => {
  const [name, setName] = useState(cityName);
  const [description, setDescription] = useState(cityDescription);

  if (!isVisible) return null;

  const handleUpdate = () => {
    onUpdate(name, description);
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-form">
        <h2>Edit City</h2>
        <form>
          <div className="form-group">
            <label htmlFor="cityName">Name</label>
            <input
              type="text"
              id="cityName"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cityDescription">Description</label>
            <textarea
              id="cityDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
          <div className="button-group">
            <Button>
              <span onClick={handleUpdate}> Update</span>
            </Button>
            <Button>
              <span onClick={onClose}>Cancel</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
