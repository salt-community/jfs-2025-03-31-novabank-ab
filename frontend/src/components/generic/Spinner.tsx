const Spinner = ({
  size = 'h-30 w-30',
  border = 'border-t-3 border-b-3',
  color = 'border-[#FFB20F]',
  className = '',
}) => (
  <div
    className={`p-20 flex justify-center text-5xl items-center ${className}`}
  >
    <span
      className={`animate-spin rounded-full ${size} ${border} ${color}`}
    ></span>
  </div>
)

export default Spinner
