import { useState } from 'react'
import Header from './components/Header'
import FeedbackList from './components/FeedbackList'
import FeedbackStats from './components/FeedbackStats'
import FeedbackForm from './components/FeedbackForm'
import FeedbackData from './data/FeedbackData'

function App() {
    const [feedback, setFeedback] = useState(FeedbackData);

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
            <FeedbackForm />
            <FeedbackStats feedback={feedback} />
            <FeedbackList feedback={feedback} handleDelete={deleteFeedbackItem} />
        </div>
        </>
    )
}

export default App