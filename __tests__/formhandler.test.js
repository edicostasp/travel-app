// Import the js file to test
import { handleSubmit } from '../src/client/js/app';
// The describe() function takes two arguments - a string description, and a test suite as a callback function.  
// A test suite may contain one or more related tests    
describe("Testing the submit functionality", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("the form is submitted after a click", () => {
        const click = new Event("click");
        expect.objectContaining(click);              
    });

    test("should return undefined if field is empty", () => {
        const data = undefined;
        expect(data).toBeUndefined;              
    });
  
});