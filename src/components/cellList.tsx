import { Fragment } from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";
import CellListItem from "./cellListItem";
import AddCellAfter from "./add-cell";
import "./cellList.css";

const CellList: React.FC = () => {
    const cells = useTypedSelector(({cells: {order, data}}) => 
         order.map((id) => data[id]
        )
    )

    const renderedCells = cells.map(cell => 
        <Fragment key={cell.id}>
            <CellListItem cell={cell} /> 
            <AddCellAfter previousCellId={cell.id}/>
        </Fragment>
        )
    
    return (
        <div className="cellList">
            <AddCellAfter forceVisible={cells.length === 0} previousCellId={null} />
            {renderedCells}
        </div>
    )
}

export default CellList;