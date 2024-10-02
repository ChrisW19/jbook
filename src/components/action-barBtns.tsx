import React from 'react';
import { useActions } from "../hooks/use-actions";
import Button from './reuseable-ActionBarBtn';
import "./action-barBtns.css";

interface ActionBarProps {
    id: string;
}

const ActionBarBtns: React.FC<ActionBarProps> = ({ id }) => {
    const { moveCell, deleteCell } = useActions();

    return (
        <div className="action-bar">
            <Button
                className="is-primary"
                onClick={() => moveCell(id, 'up')}
                icon="fa-arrow-up"
            />
            <Button
                className="is-primary"
                onClick={() => moveCell(id, 'down')}
                icon="fa-arrow-down"
            />
            <Button
                className="is-danger"
                onClick={() => deleteCell(id)}
                icon="fa-times"
            />
        </div>
    );
};

export default ActionBarBtns;