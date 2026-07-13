import DateRangePicker from "../../components/DateRangePicker";

function DateRangeFilter({ filterValue, handleValueChange, filter }) {
  const { queryKey } = filter;

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
