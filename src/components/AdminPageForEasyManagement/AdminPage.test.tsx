/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/no-node-access */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AdminPage from "./AdminPage";
import { getCities, getCity, readFromReader, searchForAHotel, updateCity } from "../../APIs";
import { City, Hotel } from "../../Types";

jest.mock("../../APIs");

const mockCities: City[] = [
    { id: 1, name: "City1", description: "Description1", lastUpdate: "2023-10-01", hotels: [] },
    { id: 2, name: "City2", description: "Description2", lastUpdate: "2023-10-02", hotels: [] },
];

const mockHotels: Hotel[] = [
    {
        hotelId: 1,
        amenities: [],
        location: "Location1",
        cityName: "City1",
        discount: 10,
        hotelName: "Hotel1",
        latitude: 0.0,
        longitude: 0.0,
        roomPhotoUrl: "url1",
        roomPrice: 100,
        roomType: "Type1",
        starRating: 4,
        description: "Description1",
        visitDate: "2023-10-01",
        priceLowerBound: 90,
        priceUpperBound: 110,
        thumbnailUrl: "thumb1",
        cityId: 1,
        gallery: [],
    },
    {
        hotelId: 2,
        amenities: [],
        location: "Location2",
        cityName: "City2",
        discount: 15,
        hotelName: "Hotel2",
        latitude: 0.0,
        longitude: 0.0,
        roomPhotoUrl: "url2",
        roomPrice: 200,
        roomType: "Type2",
        starRating: 5,
        description: "Description2",
        visitDate: "2023-10-02",
        priceLowerBound: 180,
        priceUpperBound: 220,
        thumbnailUrl: "thumb2",
        cityId: 2,
        gallery: [],
    },
];

describe("AdminPage", () => {
    beforeEach(() => {
        (getCities as jest.Mock).mockResolvedValue({ ok: true });
        (getCity as jest.Mock).mockResolvedValue({ ok: true });
        (readFromReader as jest.Mock).mockResolvedValue(JSON.stringify(mockCities));
        jest.spyOn(window, 'alert').mockImplementation(() => {});

    });

    test("renders AdminPage component", async () => {
        render(<AdminPage />);

        expect(screen.getByText("name")).toBeInTheDocument();
        expect(screen.getByText("description")).toBeInTheDocument();
        expect(screen.getByText("number of hotels")).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText("City1")).toBeInTheDocument();
            expect(screen.getByText("City2")).toBeInTheDocument();
           
        });
    });

    test("opens and closes popup form", async () => {
        render(<AdminPage />);
        await waitFor(() => {
            const childElement = screen.getByText("City1");
            fireEvent.click(childElement); 
        });

       
        expect(screen.getByText("Edit City")).toBeInTheDocument();
        
        fireEvent.click(screen.getByText("Cancel"));

        expect(screen.queryByText("Edit City")).not.toBeInTheDocument();
    });

    test("updates city", async () => {
        (updateCity as jest.Mock).mockResolvedValue({ ok: true });

        render(<AdminPage />);

        await waitFor(() => {
            fireEvent.click(screen.getByText("City1")); 
        });

        

        fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Updated City" } });
        fireEvent.change(screen.getByLabelText("Description"), { target: { value: "Updated Description" } });

        await waitFor(() => {
            fireEvent.click(screen.getByText("Update"));
        });

        await waitFor(() => {
            expect(updateCity).toHaveBeenCalled();
            expect(screen.queryByText("Update")).not.toBeInTheDocument();
        });
    });

    test("handles update city error", async () => {
        (updateCity as jest.Mock).mockResolvedValue({ ok: false });

        render(<AdminPage />);

        await waitFor(() => {
            fireEvent.click(screen.getByText("City1")); 
        });

        

        fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Updated City" } });
        fireEvent.change(screen.getByLabelText("Description"), { target: { value: "Updated Description" } });

        await waitFor(() => {
            fireEvent.click(screen.getByText("Update"));
        });

        await waitFor(() => {
            expect(updateCity).toHaveBeenCalled();
            expect(window.alert).toHaveBeenCalledWith("couldn't update city server error");
        });
    });
});


