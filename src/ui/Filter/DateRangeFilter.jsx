import DateRangePicker from "../DateRangePicker";

function DateRangeFilter({ filterValue, handleValueChange, ...filters }) {
  const { queryKey } = filters;

  return (
    <DateRangePicker
      defaultMonth={filterValue?.from}
      startMonth={new Date(2020, 0)}
      endMonth={new Date()}
      selected={filterValue}
      onSelect={(range) => handleValueChange(queryKey, range ? range : "")}
      onClear={() => handleValueChange(queryKey, "")}
      disabled={{ after: new Date() }}
      display="inline"
    />
  );
}

export default DateRangeFilter;
