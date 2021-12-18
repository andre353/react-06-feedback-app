import { v4 as uuidv4 } from "uuid";
import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext();

// in order the components to get the context, they need to be wrapped in a Provider in App.js
export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)  
  const [feedback, setFeedback] = useState([]);
  const [feedbackEdit, setFeedbackEdit] = useState({
      item: {},
      edit: false
  })

  // we want the data to be fetched as soon as the pahe loads, to be used once that's why the 2-nd argument as a array of dependancies is empty
  useEffect(() => {
      fetchFeedback()
  }, [])

  // Fetch feedback
  const fetchFeedback = async () => {
      const response = await fetch(`http://localhost:5000/feedback?_sort=id&_order=desc`)
      const data = await response.json()
      setFeedback(data);
      setIsLoading(false)
  }

  const deleteFeedbackItem = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      //  returning a new array - the old one stays untouched - based on condition that the item that we click is not equal to the item in the array, once it is equal - it is out of the new array = the new array consists only of not-clicked items
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    // let's set a unique id to each newly generated feedback item
    // to update the state, we can't just push the new feedback item on it, as it is immutable
    // we need basically make a copy of it - we get the current objects that are already there via spread operator ...
    // and on addition to those at the very beginnng of the array we put our new item=object
    setFeedback([newFeedback, ...feedback]);
  };

  // Update feedback item
  const updateFeedback = (id, updItem) => {
      // if the current id was already in feedback.item we add to the array the updated item object, otherwise we just add the new object
      setFeedback(feedback.map((item) => item.id === id ? { ...item, ...updItem } : item))
  }

  // set the clicked item to be updated via editting it
  const editFeedback = (item) => {
      setFeedbackEdit({
          item,
          edit: true
      })
  }

  // to pass the above state to the components that need it, we are to use the prop "value"
  return (
    <FeedbackContext.Provider
      value={{
        // shorthand:
        // feedback
        feedback: feedback,
        // piece of state = data of the item clicked, we pass it to the FeedbackForm - shorthand:
        feedbackEdit,
        isLoading,
        deleteFeedbackItem,
        addFeedback,
        // function to be called in in FeedbackItem when the item is clicked
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
