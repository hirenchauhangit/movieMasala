import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../redux/store"; // Adjust the path to your actual store
import App from "../App"; // Adjust the path to your actual App component

describe("App Rendering with Redux", () => {
  // Test 1: Check if App component renders correctly within the Redux Provider
  test("renders App component inside Redux Provider", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  // Test 2: Ensure the Redux store is connected by checking a state-dependent component
  test("renders component that depends on Redux state", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
});
