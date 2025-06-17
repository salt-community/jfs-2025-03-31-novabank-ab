type OcrProps = {
  ocr: string
  setOcr: React.Dispatch<React.SetStateAction<string>>
}

export default function Ocr({ ocr, setOcr }: OcrProps) {
  return (
    <>
      {/* OCR */}
      <div className="relative w-full">
        <input
          type="text"
          id="ocr"
          value={ocr}
          onChange={(e) => {
            setOcr(e.target.value)
          }}
          className="peer text-black rounded px-5 py-4 outline outline-gray-500 focus:outline-2 focus:outline-black w-full placeholder-transparent bg-white"
          placeholder="OCR / Message"
        />
        <label
          htmlFor="ocr"
          className={`absolute left-4 px-1 bg-white transition-all duration-200
              ${ocr ? '-top-2.5 text-sm font-semibold text-black' : 'top-4 text-gray-400'}
              peer-focus:-top-2.5 peer-focus:text-sm peer-focus:font-semibold peer-focus:text-black`}
        >
          OCR <span className="text-xs">(if applicable)</span>
        </label>
      </div>
    </>
  )
}
