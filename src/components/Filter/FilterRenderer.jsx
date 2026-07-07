import FormFieldLayout from "../FormFieldLayout";
import DateRangeFilter from "./DateRangeFilter";
import OptionFilter from "./OptionFilter";
import SearchFilter from "./SearchFilter";

const FILTER_COMPONENTS = {
  select: OptionFilter,
  datePicker: DateRangeFilter,
  textInput: SearchFilter,
  numberInput: SearchFilter,
};

function FilterRenderer({ filter, filterValue, handleValueChange }) {
  const FilterComponent = FILTER_COMPONENTS[filter.type];

  return (
    <FormFieldLayout id={filter.queryKey} label={filter.title}>
      <FilterComponent
        filter={filter}
        filterValue={filterValue}
        handleValueChange={handleValueChange}
      />
    </FormFieldLayout>
  );
}

export default FilterRenderer;
