import { render } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import {emissionsData}  from '../mock/data';
import SparkLine from '../SparkLine/SparkLine';

describe("SparkLine", () => { 
    it("renders", () => {
        const { getByTestId } = render(<SparkLine data={emissionsData} height={'100px'} lineColor={'#1D70B8'}/>);
        expect(getByTestId("spark-line")).toBeInTheDocument();
    }
    );
});

