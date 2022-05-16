import { render } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import ValuesBlock from '../ValuesBlock/ValuesBlock';

const valuesBlockArgs = {
    xStart: '0',
    xEnd: '100',
    yStart: '0',
    yEnd: '100',
    xColor: '#000000',
    yColor: '#000000',
};

describe("Bar", () => { 
    it("renders", () => {
        const { getByTestId } = render(<ValuesBlock {...valuesBlockArgs} />);
        expect(getByTestId("values-block")).toBeInTheDocument();
    }
    );
});
