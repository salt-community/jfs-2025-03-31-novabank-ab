export default function TransferPage() {
  const handleSubmit = () => {}

  return (
    <>
      <h1 className="text-3xl">New transfer</h1>
      <form onSubmit={handleSubmit} className="space-y-6 mt-10">
        {/* From account */}
        <div className="flex flex-col relative">
          <select
            name="pets"
            id="pet-select"
            className="border rounded px-5 py-3 bg-gray-50 focus:ring-1 focus:ring-black w-full"
          >
            <option value="">From account</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="hamster">Hamster</option>
            <option value="parrot">Parrot</option>
            <option value="spider">Spider</option>
            <option value="goldfish">Goldfish</option>
          </select>
        </div>

        {/* Notes */}
        <div className="flex flex-col">
          <label className="text-lg font-semibold mb-2">Notes</label>
          <textarea
            value="notes"
            // onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="border rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black resize-none"
            placeholder="Write anything important about this log..."
          />
        </div>

        {/* Errors */}
        {/* {(validationError || error) && (
          <p className="font-bold text-[#832035] text-sm text-right">
            {validationError ||
              (error?.message === 'Failed to fetch'
                ? 'Failed to fetch log form'
                : error?.message)}
          </p>
        )} */}

        <div className="flex justify-end">
          <button
            type="submit"
            // disabled={isPending}
            className="bg-[#351C24] hover:bg-[#502A36] text-white px-5 py-2 rounded hover:cursor-pointer transition-colors w-full sm:w-auto"
          >
            Save Log
          </button>
        </div>
      </form>
    </>
  )
}
