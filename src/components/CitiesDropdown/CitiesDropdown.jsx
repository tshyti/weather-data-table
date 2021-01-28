import { Select } from "antd";
import cities from "./city.list.json";

const { Option } = Select;

export default function CitiesDropdown({ onSelectCity }) {
  return (
    <div>
      <Select
        showSearch
        style={{ minWidth: 200, maxWidth: 300 }}
        placeholder="Select a city"
        optionFilterProp="children"
        onChange={onSelectCity}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {cities.map((city) => (
          <Option key={city.id} value={city.id}>
            {city.name + ", " + city.country}
          </Option>
        ))}
      </Select>
    </div>
  );
}
