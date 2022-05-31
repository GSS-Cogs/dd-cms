import { render } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { renewablesData}  from '../mock/data';
import Bar from '../Bar/Bar';

describe("Bar", () => { 
    it("renders", () => {
        const { getByTestId } = render(<Bar data={renewablesData} height={'10px'} />);
        expect(getByTestId("bar")).toBeInTheDocument();
    }
    );
});
