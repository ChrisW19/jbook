import React from 'react';

interface AddCellBtnProps {
    onClick: () => void;
    btnName: string;
}

const AddCellBtn: React.FC<AddCellBtnProps> = ({ onClick, btnName}) => {
    return (
        <button
      className={`button is-rounded is-primary is-small`} 
      onClick={onClick}
    >
      <span className="icon is-small">
        <i className={`fas fa-plus`}></i>
      </span>
      <span>
        {btnName}
      </span>
    </button>
    );
};

export default AddCellBtn;