import React from "react";
import { render, cleanup } from "react-testing-library";
import Users from "./Users";
import { HomeProvider } from "../../store/modules";

afterEach(cleanup);
describe('<Users />', () => {
  it("renders", () => {
    const { asFragment } = render(
      <HomeProvider>
        <Users />
      </HomeProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});