import React from "react"
import { Rating } from "flowbite-react"
import type { LoaderArgs } from "@remix-run/node"
import { requireAuth } from "~/utils.server"

export async function loader(args: LoaderArgs) {
  await requireAuth(args)
  return {}
}

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
    <section className="">
      <div className="mb-8">
        <h2 className="text-3xl font-bold my-4">Your reviews</h2>
        <p className="text-neutral-700">
          Last <span className="underline font-bold">30 days</span>
        </p>
      </div>
      <React.Fragment>
        <Rating>
          <Rating.Star />
          <Rating.Star />
          <Rating.Star />
          <Rating.Star />
          <Rating.Star />
          <p className="ml-2 text-base font-medium text-gray-500 dark:text-gray-400">
            5 out of 5
          </p>
        </Rating>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 py-2">
          2 ratings
        </p>
        <Rating.Advanced percentFilled={100}>5 star</Rating.Advanced>
        <Rating.Advanced
          percentFilled={0}
          className="mt-1"
        >
          4 star
        </Rating.Advanced>
        <Rating.Advanced
          percentFilled={0}
          className="mt-1"
        >
          3 star
        </Rating.Advanced>
        <Rating.Advanced
          percentFilled={0}
          className="mt-1"
        >
          2 star
        </Rating.Advanced>
        <Rating.Advanced
          percentFilled={0}
          className="mt-1 ml-[2px]"
        >
          1 star
        </Rating.Advanced>
      </React.Fragment>
      <h3 className="text-xl font-bold mt-12">
        Reviews ({reviewsData.length})
      </h3>
      {reviewsData.map((review) => (
        <div key={review.id}>
          <div className="my-6">
            <Rating>
              {[...Array(review.rating)].map((_, i) => (
                <Rating.Star key={i} />
              ))}
            </Rating>
            <div className="flex my-3">
              <p className="mr-2 font-semibold ">{review.name}</p>
              <p className="text-neutral-500">{review.date}</p>
            </div>
            <p className="text-neutral-700">{review.text}</p>
          </div>
          <hr />
        </div>
      ))}
    </section>
  )
}
