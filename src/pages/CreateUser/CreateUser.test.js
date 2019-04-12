import React from "react";
import { render, cleanup } from "react-testing-library";
import CreateUser from "./CreateUser";
import { CreateUserProvider } from "../../store/modules";

afterEach(cleanup);
describe('<CreateUser />', () => {
  it("renders", () => {
    const { asFragment } = render(
      <CreateUserProvider>
        <CreateUser />
      </CreateUserProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});