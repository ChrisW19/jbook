import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../cell";
import {produce} from 'immer';

interface CellsState {
    loading: boolean;
    error: string | null;
    order: string[];
    data: {
        [key: string]: Cell;
    }
};

const initialState: CellsState = {
    loading: false,
    error: null,
    order: [],
    data: {},
};

const reducer = produce((state: CellsState = initialState, action: Action) => {
    switch (action.type) {
        case ActionType.UPDATE_CELL:
            const {id, content} = action.payload;
            state.data[id].content = content;
            return state;
        case ActionType.DELETE_CELL:
            const deleteId = action.payload.id;
            delete state.data[deleteId];
            state.order = state.order.filter(id => id !== deleteId);
            return state;
        case ActionType.MOVE_CELL:
            const { id: moveCellId, direction } = action.payload;
            const index = state.order.findIndex((id) => id === moveCellId);
            const targetIndex = direction === 'up' ? index - 1 : index + 1;
        
            if (targetIndex < 0 || targetIndex > state.order.length - 1) {
                return state;
            }
        
            // Swap cells in order
            [state.order[index], state.order[targetIndex]] = [state.order[targetIndex], state.order[index]];
            return state;
        case ActionType.INSERT_CELL_AFTER:
            const { id: targetCellId, type } = action.payload
            const cell: Cell = {
                id: randomId(),
                content: '',
                type,
            }
            
            state.data[cell.id] = cell;

            //Find index of target cell
            const foundIndex = state.order.findIndex(id => id === targetCellId);

            //Insert new cell after the target or end if not found
            if (foundIndex < 0 ){
                state.order.unshift(cell.id)
            } else {
                state.order.splice(foundIndex + 1, 0, cell.id);
            };

            return state;
        default:
            return state;
    }
}, initialState);

const randomId = () => {
    return Math.random().toString(36).substring(2, 5);
}

export default reducer;