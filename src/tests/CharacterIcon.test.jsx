import { render, screen } from '@testing-library/react';
import { CharacterIcon } from '../components/CharacterIcon';
import userEvent from "@testing-library/user-event";
import { vi } from 'vitest';


describe("CharacterIcon component", () => {

    it("Renders two character icons", () => {

        const charactersMockData = [
            {name: "Arnold", isFound: false},
            {name: "Johnny Bravo", isFound: false},
            {name: "Courage", isFound: false},
        ]
        render(
            <>
                <CharacterIcon character={charactersMockData[0]}/>
                <CharacterIcon character={charactersMockData[1]}/>
            </>
        );

        const iconImage1 = screen.getByAltText(/arnold icon/i);
        const iconImage2 = screen.getByAltText(/johnny bravo/i);
        const iconImage3 = screen.queryByAltText(/courage/i);

        expect(iconImage1).toBeInTheDocument();
        expect(iconImage2).toBeInTheDocument();
        expect(iconImage3).toBeNull();
    });

    it("Should display spinner is icon is in a loading state", () => {

        const charactersMockData = [
            {name: "Jim", isFound: false},
            {name: "Jill", isFound: false},
            {name: "James", isFound: false},
        ]

        render(
            <>
                <CharacterIcon 
                    character={charactersMockData[0]}
                    imageIsLoading={true}
                />
                <CharacterIcon 
                    character={charactersMockData[1]}
                    imageIsLoading={false}
                />
            </>
        );

        const firstIcon = screen.queryByAltText(/jim/i);
        const firstIconSpinner = screen.getByTestId("spinner");

        expect(firstIconSpinner).toBeInTheDocument();
        expect(firstIcon).toBeNull();
    });

    it("Should not render character icons for characters that have been found", () => {

        const charactersMockData = [
            {name: "Jim", isFound: true},
            {name: "Jill", isFound: true},
            {name: "James", isFound: false},
        ]

        render(
            <>
                <CharacterIcon character={charactersMockData[0]}/>
                <CharacterIcon character={charactersMockData[1]}/>
                <CharacterIcon character={charactersMockData[2]}/>
            </>
        );

        const firstCharacterIcon = screen.queryByAltText(/jim/i);
        const secondCharacterIcon = screen.queryByAltText(/jill/i);
        const thirdCharacterIcon = screen.queryByAltText(/james/i);

        expect(firstCharacterIcon).toBeNull();
        expect(secondCharacterIcon).toBeNull();
        expect(thirdCharacterIcon).toBeInTheDocument();
    });

    it("Checks for a found character when correct button is clicked", async () => {

        const characterMock1 = {
            name: "Jamie", 
            isFound: false
        }

        const characterMock2 = {
            name: "Ryan",
            isFound: false
        }

        const checkCharacterFoundMock = vi.fn();

        render(
            <>
            <CharacterIcon 
                character={characterMock1} 
                checkCharacterFound={checkCharacterFoundMock}
                imageIsClicked={true}
            />
            <CharacterIcon 
                character={characterMock2} 
                checkCharacterFound={checkCharacterFoundMock}
                imageIsClicked={true}
            />
            
            </>
        );

        const user = userEvent.setup();

        const buttons = screen.getAllByText("^");

        for (const button of buttons) {
            await user.click(button);
        }

        expect(checkCharacterFoundMock).toBeCalledTimes(2);
    });

});