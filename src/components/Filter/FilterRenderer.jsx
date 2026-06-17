import FormFieldLayout from "../../ui/FormFieldLayout";
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
    <FormFieldLayout label={filter.title}>
      <FilterComponent
        filter={filter}
        filterValue={filterValue}
        handleValueChange={handleValueChange}
      />
    </FormFieldLayout>
  );
}

export default FilterRenderer;
