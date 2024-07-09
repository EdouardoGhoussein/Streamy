interface DropdownOption {
  href: string;
  label: string;
}

interface DropdownOptions {
  options: DropdownOption[];
}

const DropDownMenu = ({ options }: DropdownOptions) => {
  return (
    <div className="dropdown mb-5">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        DropDown &emsp; &emsp; &emsp;
      </button>
      <ul className="custom-dropdown-menu dropdown-menu">
        {options.map((option, index) => (
          <li key={index}>
            <button
              className="dropdown-item"
              type="button"
              onClick={() => console.log(option)}
            >
              {option.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDownMenu;
