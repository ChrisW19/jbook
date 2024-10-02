import { Cell } from "../state";
import CodeCell from "./code-cell";
import TextEditor from "./text-editor";
import ActionBarBtns from "./action-barBtns";
import "./cellListItem.css";

interface CellListItemProps {
    cell: Cell
}

const CellListItem: React.FC<CellListItemProps> = ({cell}) => {
    const child = cell.type === 'code' ? 
        <>
            <div className="action-bar-wrapper">
                <ActionBarBtns id={cell.id}/>
            </div>
            <CodeCell cell={cell} /> 
        </>
        : 
        <>
            <TextEditor cell={cell} />
            <ActionBarBtns id={cell.id}/>
        </>;

    return (
        <div className="cell-list-item">
            {child} 
        </div>
    )
}

export default CellListItem;