import { render, screen } from '@testing-library/react';
import { CharacterIcon } from '../components/CharacterIcon';

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

    //TEST IF THE CHARACTER HAS A FOUND PROPERTY, THEN WE CAN ASSERT THAT THE COMPONENT IS NULL, AS IT SHOULDN'T BE RENDERED.

    //TEST THAT WHEN THE IMAGE STATE IS SET TO CLICKED, AND WE CLICK THE ^ BUTTON, IT CALLS THE CHECKCHARACTERFOUND METHOD, WE CAN MOCK THIS FUNCTION OUT.
});