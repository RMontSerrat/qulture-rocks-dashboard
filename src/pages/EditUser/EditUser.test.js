import React from "react";
import { render, cleanup } from "react-testing-library";
import EditUser from "./EditUser";
import { EditUserProvider } from "../../store/modules";

afterEach(cleanup);
describe('<EditUser />', () => {
  it("renders", () => {
    const { asFragment } = render(
      <EditUserProvider loadingGetUser={true}>
        <EditUser match={{ params: { id: 1 }} } />
      </EditUserProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});