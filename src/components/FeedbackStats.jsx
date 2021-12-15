import PropTypes from 'prop-types'

function FeedbackStats({feedback}) {
// Calculate rating avg
let average = feedback.reduce((acc, current) => {
    return acc + current.rating
}, 0) / feedback.length
// if there is 0 decimal place, it will remove it, otherwise it will display
average = average.toFixed(1).replace(/[.,]0$/, '')

    return (
        <div className='feedback-stats'>
            <h4>{feedback.length} Reviews</h4>
            <h4>Average Rating: {isNaN(average) ? 0 : average}</h4>
        </div>
    )
}

FeedbackStats.propTypes = {
    feedback: PropTypes.array.isRequired,
}

export default FeedbackStats
