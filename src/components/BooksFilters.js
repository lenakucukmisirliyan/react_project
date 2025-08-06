import { useDispatch, useSelector } from "react-redux";
import { setSort } from "../features/books/filtersSlice";
import { FormattedMessage } from "react-intl";

const BooksFilters = () => {
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.filters.sort);

  const handleSortChange = (e) => {
  dispatch(setSort(e.target.value));
};
  return (
    <div className="filters">
      <label>
        <select onChange={handleSortChange} value={sort}>
          <option value="recommended">
             <FormattedMessage id="books.recommended" defaultMessage="Önerilen" />
          </option>
          <option value="az">A-Z</option>
          <option value="za">Z-A</option>
        </select>
      </label>
    </div>
  );
};

export default BooksFilters;
