import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Block from "./";

/**
 * Block Testing
 * Please Complete these tests
 */

/**
 * Hash is set on load
 * We need to check that when component is rendered,
 * onHash is called and the hash change is reflected in the component
 */
it("Hash is set on load", () => {
  //mock function for on hash
  const mockOnHash = jest.fn();

  const { getByText } = render(
    <Block block={1} onHash={mockOnHash} hash={undefined} />
  );

  //check for onHash was called
  expect(mockOnHash).toHaveBeenCalled();

  //check hash change is reflected in the component
  expect(getByText("Not Valid")).toBeInTheDocument();
});

/**
 * Shows not valid text
 * On render, the text 'Not Valid' should be in the document as the hash is not valid
 */
it("Shows not valid text", () => {
  const mockOnHash = jest.fn();
  const { getByText } = render(
    <Block block={1} onHash={mockOnHash} hash={undefined} />
  );

  expect(getByText("Not Valid")).toBeInTheDocument();
});

/**
 * Delete is called correctly
 * We need to make sure that when clicking on delete, the delete function is called
 */
it("Delete is called correctly", () => {
  const mockOnHash = jest.fn();
  const mockOnDelete = jest.fn();

  const { getByText } = render(
    <Block
      block={1}
      onHash={mockOnHash}
      onDelete={mockOnDelete}
      hash={undefined}
    />
  );

  const deleteButton = getByText("Delete");
  userEvent.click(deleteButton);

  expect(mockOnDelete).toHaveBeenCalled();
});

/**
 * Mining works correctly
 * We need to be able to click on mine and expect the block hash to now be valid
 * The text 'Valid' should also be in the document
 */
it("Mining works correctly", () => {
  const mockOnHash = jest.fn();

  const { getByText, rerender } = render(
    <Block block={1} onHash={mockOnHash} hash={undefined} />
  );
  expect(getByText("Not Valid")).toBeInTheDocument();

  const mineButton = getByText("Mine");
  userEvent.click(mineButton);
  const calledWithHash =
    mockOnHash.mock.calls[mockOnHash.mock.calls.length - 1][1];

  //render the component with the new hash
  rerender(<Block block={1} onHash={mockOnHash} hash={calledWithHash} />);

  expect(getByText("Valid")).toBeInTheDocument();
  expect(mockOnHash).toHaveBeenCalled();
});

/**
 * Changing data effects hash
 * The data textarea can be change,
 * we need to make sure the changes effect the hash and that onHash is called
 */
it("Changing data effects hash", () => {
  const mockOnHash = jest.fn();
  const { getByLabelText } = render(
    <Block block={1} onHash={mockOnHash} hash={undefined} />
  );
  mockOnHash.mockClear();
  const dataTextarea = getByLabelText("Data");
  userEvent.type(dataTextarea, "Hello World");
  expect(mockOnHash).toHaveBeenCalled();
});
