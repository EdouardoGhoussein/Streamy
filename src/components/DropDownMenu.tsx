export interface DropdownOption {
  id: number | string;
  name: string;
}

interface DropdownOptions {
  options: DropdownOption[];
  value: DropdownOption;
  onChange: React.Dispatch<React.SetStateAction<DropdownOption>>;
}

const DropDownMenu = ({ options, value, onChange }: DropdownOptions) => {
  return (
    <div className="dropdown mb-5">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        data-bs-offset="0,20"
      >
        {value.name} &emsp; &emsp;
      </button>
      <ul className="custom-dropdown-menu dropdown-menu">
        {options.map((option, index) => (
          <li key={index}>
            <button
              className="dropdown-item"
              type="button"
              onClick={() => onChange({ id: option.id, name: option.name })}
            >
              {option.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDownMenu;
