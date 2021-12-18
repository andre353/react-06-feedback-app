import { useState, useContext, useEffect } from "react";
import Card from "./shared/Card";
import RatingSelect from "./RatingSelect";
import Button from "./shared/Button";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackForm() {  
  const [text, setText] = useState("");
  const [rating, setRating] = useState(10);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState("");
  
  const {addFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext)

  // any time a button FaEdit is clicked - a side effect will take place
  useEffect(() => {
    // check 
    if(feedbackEdit.edit === true) {
      setBtnDisabled(false); // we enable the button
      setText(feedbackEdit.item.text); // item is the object, text is its property
      setRating(feedbackEdit.item.rating); 
    }
  }, [feedbackEdit])
  
  const handleTextChange = (e) => {
      if(text === '') {
        setBtnDisabled(true);
        setMessage(null);
      } else if(text !== '' && text.trim().length <= 10) {
          setMessage('Text must be at least 10 characters');
        setBtnDisabled(true);
      } else {
        setMessage(null);
        setBtnDisabled(false);
      }
      setText(e.target.value)
  };

  const handleSubmit = (e) => {
    e.preventDefault() // as we submit to the actual file
    // as the button still can be accessed via client
    if(text.trim().length > 10) {
      const newFeedback = {
        // text (from db): text (from local State), it can be written as a shorthand just in one word - text, rating
        text: text,
        rating: rating,
      }

      if (feedbackEdit.edit === true) {
        updateFeedback(feedbackEdit.item.id, newFeedback)
      } else {
        addFeedback(newFeedback)
      }

      setText('')
    } 
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={(rate) => setRating(rate)} />
        <div className="input-group">
          <input
            onChange={handleTextChange}
            type="text"
            placeholder="Write a review"
            value={text}
          />
          <Button type='submit' version='secondary' isDisabled={btnDisabled}>Send</Button>
        </div>

        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  );
}

export default FeedbackForm
