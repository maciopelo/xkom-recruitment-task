import React from "react";
import {render} from "@testing-library/react"
import SeatDescriber from "../components/SeatDescriber"
import "@testing-library/jest-dom/extend-expect"
import validSeats from "../../__mocks__/validSeats.json"
import axios from "axios"

jest.mock('axios')

describe("fetchData", ()=> {

    test("fetches properly seats data from an API", async ()=> {
        const data = validSeats;
        axios.get.mockImplementationOnce( () =>  Promise.resolve(data) )
    });


    test("fetch seats data with an error from an API", async ()=> {
        const errorMsg = "Network Error"
        axios.get.mockImplementationOnce( () =>  Promise.reject(errorMsg) )
    });

})
