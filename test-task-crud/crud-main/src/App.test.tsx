import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";
import App from "./App";

describe("<App />", () => {
  const wrapper = render(<App />);

  test("App mounts h1 properly", () => {
    // Get by h1
    const h1 = wrapper.container.querySelector("h1");
    expect(h1?.textContent).toBe("Customer Acquisition Channel CRUD");
  });
  test("App mounts h2 properly", () => {
    const wrapper = render(<App />);

    // Get by h2
    const h2 = wrapper.container.querySelector("h2");
    expect(h2?.textContent).toBe("Table");
  });
  test("App mounts table properly", () => {
    const wrapper = render(<App />);

    // Get by Table
    const table = wrapper.container.querySelector("table");
    expect(table?.textContent).toBe("ChannelAmountActions");
  });
});
