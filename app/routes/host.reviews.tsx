import React from "react"
import { Rating } from "flowbite-react"

export default function Reviews() {
  const reviewsData = [
    {
      rating: 5,
      name: "Elliot",
      date: "January 3, 2023",
      text: "The beach bum is such an awesome van! Such a comfortable trip. We had it for 2 weeks and there was not a single issue. Super clean when we picked it up and the host is very comfortable and understanding. Highly recommend!",
      id: "1",
    },
    {
      rating: 5,
      name: "Sandy",
      date: "December 12, 2022",
      text: "This is our third time using the Modest Explorer for our travels and we love it! No complaints, absolutely perfect!",
      id: "2",
    },
  ]

  return (
    <section className="host-reviews">
      <div className="top-text">
        <h2>Your reviews</h2>
        <p>
          Last <span>30 days</span>
        </p>
      </div>
      <React.Fragment>
        <Rating>
          <Rating.Star />
          <Rating.Star />
          <Rating.Star />
          <Rating.Star />
          <Rating.Star />
          <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
            5 out of 5
          </p>
        </Rating>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          2 ratings
        </p>
        <Rating.Advanced percentFilled={100}>5 star</Rating.Advanced>
        <Rating.Advanced percentFilled={0}>4 star</Rating.Advanced>
        <Rating.Advanced percentFilled={0}>3 star</Rating.Advanced>
        <Rating.Advanced percentFilled={0}>2 star</Rating.Advanced>
        <Rating.Advanced percentFilled={0}>1 star</Rating.Advanced>
      </React.Fragment>
      <h3>Reviews ({reviewsData.length})</h3>
      {reviewsData.map((review) => (
        <div key={review.id}>
          <div className="review">
            <Rating>
              {[...Array(review.rating)].map((_, i) => (
                <Rating.Star key={i} />
              ))}
            </Rating>
            <div className="info">
              <p className="name">{review.name}</p>
              <p className="date">{review.date}</p>
            </div>
            <p>{review.text}</p>
          </div>
          <hr />
        </div>
      ))}
    </section>
  )
}
