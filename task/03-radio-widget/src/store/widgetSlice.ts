import { createSlice } from "@reduxjs/toolkit";

interface RadioStation {
    id: string;
    title: string;
    frequency: string;
    isShowing: Boolean;
}
interface RadioStationSlice {
    radioStations: RadioStation[];
}
const initialState: RadioStationSlice = {
    radioStations: [
        { id: "1", title: "Putin FM", frequency: "66,6", isShowing: false },
        { id: "2", title: "Dribbble FM", frequency: "101,2", isShowing: false },
        { id: "3", title: "Doge FM", frequency: "99,4", isShowing: false },
        { id: "4", title: "Ballads FM", frequency: "87,1", isShowing: false },
        { id: "5", title: "Maximum FM", frequency: "142,2", isShowing: false },
    ],
};

const widgetSlice = createSlice({
    name: "widgets",
    initialState,
    reducers: {
        updateActiveStations(state, action) {
            const id = action.payload;
            const existingStation = state.radioStations.find(
                (radioStation) => radioStation.id === id
            );
            if (existingStation) {
                existingStation.isShowing = !existingStation.isShowing;
            }
        },
    },
});

export const selectAllWidget = (state: any) => state.widgets.radioStations;
export const { updateActiveStations } = widgetSlice.actions;

export default widgetSlice.reducer;
