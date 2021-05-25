import React from "react";
import {render} from "@testing-library/react"
import SeatDescriber from "../components/SeatDescriber"
import "@testing-library/jest-dom/extend-expect"


test("renders 'SeatDescriber' with given description prop ", ()=>{
    const { getByText } = render(<SeatDescriber size={300} color={"#fff"} desc={"Miejsca dostępne"}/>)
    const seatDesc = getByText("Miejsca dostępne")

    expect(seatDesc.textContent).toBe("Miejsca dostępne")
})


