import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import AnnotationForm from "../components/AnnotationForm";
const mockCreateObjectURL = jest.fn();
global.URL.createObjectURL = mockCreateObjectURL;
beforeEach(() => jest.clearAllMocks());

describe("AnnotationForm", () => {
  // test that the annotation form renders
  it("renders a form", () => {
    render(<AnnotationForm />);
    const annotationForm = screen.getByTestId("annotationForm");
    expect(annotationForm).toBeInTheDocument();
  });

  // test that the supplier name input renders
  it("Supplier name input", async () => {
    render(<AnnotationForm />);

    const input = screen.getByRole<HTMLInputElement>("textbox", {
      name: "Supplier name",
    });

    await act(async () => {
      fireEvent.change(input, { target: { value: "IKEA" } });
    });

    expect(input).toHaveValue("IKEA");
  });
});
