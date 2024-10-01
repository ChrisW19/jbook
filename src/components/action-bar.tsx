import React from 'react';
import { useActions } from "../hooks/use-actions";
import Button from './reuseable-btn';

interface ActionBarProps {
    id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
    const { moveCell, deleteCell } = useActions();

    return (
        <div>
            <Button
                className="is-primary"
                onClick={() => moveCell(id, 'up')}
                icon="fas fa-arrow-up"
            />
            <Button
                className="is-primary"
                onClick={() => moveCell(id, 'down')}
                icon="fas fa-arrow-down"
            />
            <Button
                className="is-danger"
                onClick={() => deleteCell(id)}
                icon="fas fa-times"
            />
        </div>
    );
};

export default ActionBar;