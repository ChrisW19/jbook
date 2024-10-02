import "./add-cell.css";
import { useActions } from "../hooks/use-actions";
import Button from './reuseable-AddCellBtns';

interface AddCellProps {
    previousCellId: string | null;
    forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({forceVisible, previousCellId}) => {
    const { insertCellAfter } = useActions();
    return <div className={`add-cell ${forceVisible && 'force-visible'}`}>
                <div className="add-buttons">
                    <Button
                        onClick={() => insertCellAfter(previousCellId, 'code')}
                        btnName='Code'
                    />
                    <Button
                        onClick={() => insertCellAfter(previousCellId, 'text')}
                        btnName=' Text'
                    />
                </div>
                <div className="divider" />
            </div>
};

export default AddCell;