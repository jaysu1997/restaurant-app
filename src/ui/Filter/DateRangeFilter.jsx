import DateRangePicker from "../DateRangePicker";

function DateRangeFilter({ filterValue, handleValueChange, ...filters }) {
  const { queryKey, placeholder } = filters;

  return (
    <DateRangePicker
      placeholder={placeholder}
      startMonth={new Date(2020, 0)}
      endMonth={new Date()}
      selected={filterValue}
      onSelect={(range) => handleValueChange(queryKey, range ? range : "")}
      handleValueReset={() => handleValueChange(queryKey, "")}
    />
  );
}

export default DateRangeFilter;
