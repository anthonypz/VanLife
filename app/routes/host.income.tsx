import incomeGraph from "~/assets/images/income-graph.png"

export default function Income() {
  const transactionsData = [
    { amount: 720, date: "Jan 3, '23", id: "1" },
    { amount: 560, date: "Dec 12, '22", id: "2" },
    { amount: 980, date: "Dec 3, '22", id: "3" },
  ]
  return (
    <section className="host-income">
      <h1 className="text-3xl font-bold my-4">Income</h1>
      <p className="text-neutral-700">
        Last <span className="underline font-bold">30 days</span>
      </p>
      <h2 className="text-4xl font-black my-6">$2,260</h2>
      <img
        className="w-full max-w-lg"
        src={incomeGraph}
        alt="Income graph"
      />
      <div className="mt-8">
        <h3 className="text-2xl font-bold my-4">Your transactions (3)</h3>
        <p className="text-neutral-700">
          Last <span className="underline font-bold">30 days</span>
        </p>
      </div>
      <div className="mt-4">
        {transactionsData.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-white mb-8 p-8 rounded border border-orange-200"
          >
            <h3 className="text-4xl font-semibold">${item.amount}</h3>
            <p className="text-xl font-medium text-neutral-700">{item.date}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
