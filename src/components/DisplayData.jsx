const DisplayData = ({ label, data, border = true }) => {
  return (
    <div className={`md:w-1/4 ${border ? 'md:border-r-2' : ''}`}>
      <p className="text-dark-gray mb-0.5 text-xs font-semibold tracking-[1px] md:mb-2 md:text-sm">{label}</p>
      <h4 className="break-words text-lg font-semibold md:text-[22px]">{data}</h4>
    </div>
  );
};

export default DisplayData;
