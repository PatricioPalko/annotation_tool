import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../page";

beforeEach(() => jest.clearAllMocks());

window.URL.createObjectURL = jest.fn();
window.URL.revokeObjectURL = jest.fn();

describe("Page", () => {
  // test that the dropzone components renders
  it("renders a dropzone", async () => {
    const { getByText } = render(<Home />);
    expect(
      getByText(`(Only *.jpeg, *.jpg, *.png images and *.pdf will be accepted)`)
    ).toBeInTheDocument();
    expect(
      getByText("Drag 'n' drop some file here, or click to select file")
    ).toBeInTheDocument();
  });

  // test that the upload button renders
  it("renders a upload button", async () => {
    render(<Home />);

    const button = await screen.findByRole("button");
    expect(button).toBeInTheDocument();
  });

  // test that the dropzone component can upload a file
  it("upload a file", async () => {
    // Mock the file object
    const file = new File(["hello"], "hello.png", { type: "image/png" });

    // Render the component
    render(<Home />);

    // Get the file input element
    const fileInput = screen.getByTestId("dropzone") as HTMLInputElement;

    // Simulate file upload
    userEvent.upload(fileInput, file);

    // Create a FileList object containing the uploaded file
    const fileList = {
      0: file, // Index 0 represents the file
      length: 1, // Length of the FileList
      item: (index: number) => file, // Function to retrieve the file at the specified index
    };

    // Assign the FileList object to the files property of the file input element
    Object.defineProperty(fileInput, "files", {
      value: fileList,
      writable: true,
    });

    // Wait for the file to be uploaded
    await waitFor(() => {
      expect(fileInput.files).not.toBeNull(); // Ensure files is not null
      expect(fileInput.files).toHaveLength(1);
    });

    // Optional: Assert against file name, type, etc. after null check
    if (fileInput.files && fileInput.files.length > 0 && fileInput.files[0]) {
      expect(fileInput.files[0].name).toBe("hello.png");
      expect(fileInput.files[0].type).toBe("image/png");
    } else {
      fail("File not uploaded or files array is null.");
    }
  });

  // test that the logo renders
  test("to have appropriate logo src and alt text", () => {
    const expectedSrc = expect.stringMatching("logo.svg");
    render(<Home />);
    const logo = screen.getByTestId("logo");
    expect(logo).toHaveAttribute("src", expectedSrc);
    expect(logo).toHaveAttribute("alt", "annotation tool logo");
  });

  // test that the heading renders
  test("it renders the given heading", () => {
    const name = "annotation tool";
    render(<Home />);
    expect(screen.getByText(`${name}`)).toBeInTheDocument();
  });
});
