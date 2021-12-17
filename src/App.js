import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Header from './components/Header'
import FeedbackList from './components/FeedbackList'
import FeedbackStats from './components/FeedbackStats'
import FeedbackForm from './components/FeedbackForm'
import FeedbackData from './data/FeedbackData'

function App() {
    const [feedback, setFeedback] = useState(FeedbackData);

    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4();
        // let's set a unique id to each newly generated feedback item
        // to update the state, we can't just push the new feedback item on it, as it is immutable
        // we need basically make a copy of it - we get the current objects that are already there via spread operator ... 
        // and on addition to those at the very beginnng of the array we put our new item=object
        setFeedback([newFeedback, ...feedback]);
    }

    const deleteFeedbackItem = (id) => {
        if(window.confirm('Are you sure you want to delete this item?')) {
            //  returning a new array - the old one stays untouched - based on condition that the item that we click is not equal to the item in the array, once it is equal - it is out of the new array = the new array consists only of not-clicked items
            setFeedback(feedback.filter((item) => item.id !== id))
        }
    }

    return (
        <>
        <Header/>
        <div className="container">
            <FeedbackForm handleAdd={addFeedback} />
            <FeedbackStats feedback={feedback} />
            <FeedbackList feedback={feedback} handleDelete={deleteFeedbackItem} />
        </div>
        </>
    )
}

export default App