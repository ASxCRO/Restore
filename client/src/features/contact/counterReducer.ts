export const INCREMENT_COUNTER = "INCREMENT_COUNTER";
export const DECREMENT_COUNTER = "DECREMENT_COUNTER";

export interface CouterState {
    data: number;
    title: string;
}

const initialState: CouterState = {
    data: 42,
    title: 'YARC (yet another redux counter)'
}

export default function counterReducer(state = initialState, action: any) {
    return state;
}