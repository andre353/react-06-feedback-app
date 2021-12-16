import { useState } from "react";
import Card from "./shared/Card";
import RatingSelect from "./RatingSelect";
import Button from "./shared/Button";

function FeedbackForm({handleAdd}) {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(10);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState("");

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
        rating: rating
      }
      handleAdd(newFeedback);
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

export default FeedbackForm;
