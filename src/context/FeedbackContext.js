import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext();

// in order the components to get the context, they need to be wrapped in a "createContext().Provider" in App.js
export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)  
  const [feedback, setFeedback] = useState([]);
  const [feedbackEdit, setFeedbackEdit] = useState({
      item: {},
      edit: false
  })

  // we want the data to be fetched as soon as the page loads, to be used once that's why the 2-nd argument as an array of dependancies is empty
  useEffect(() => {
      fetchFeedback()
  }, [])

  // Fetch feedback
  const fetchFeedback = async () => {
      const response = await fetch(`/feedback?sort=id&order=desc`)
      // const response = await fetch(`/feedback?_sort=id&_order=desc`)
      // The json() method of the Response interface takes a Response stream and reads it to completion. It returns a promise which resolves with the result of parsing the body text as JSON.
      const data = await response.json()
      // assigning fetched data to feedback variable
      setFeedback(data);
      setIsLoading(false)
  }

  const deleteFeedbackItem = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      await fetch(`/feedback/${id}`, { method: 'DELETE'})
      //  returning a new array - the old one stays untouched - based on condition that the item that we click is not equal to the item in the array, once it is equal - it is out of the new array = the new array consists only of not-clicked items
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  const addFeedback = async (newFeedback) => {
    const response = await fetch('/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newFeedback)
    })
    const data = await response.json()
    // json npm autoincrements - for id
    setFeedback([data, ...feedback])
  }

  // Update feedback item after editting it
  const updateFeedback = async (id, updItem) => {
    const response = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updItem)
    })

    const data = await response.json()
      // ids compared, if the current id already exists in feedback.item - item object will be only updated with the fields changed, otherwise we just add the new object
      setFeedback(feedback.map((item) => item.id === id ? { ...item, ...data } : item))
  }

  // set the clicked item to be updated via it's edit
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
