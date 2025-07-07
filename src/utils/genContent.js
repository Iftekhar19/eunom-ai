import model from "./msgGeneration";

  const genContent = async (prompt) => {
    try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
        
    } catch (error) {

        
        console.error("Error generating content:", error);
        throw error; // Re-throw the error for further handling
        
    }
}
export {genContent}