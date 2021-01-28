import { Table, Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { getDateFromUnixTimestamp } from "../../util/dateParsers";
import { capitalizeFirstLetter } from "../../util/stringManipulations";

export default function WeatherDataTable({ data, loading }) {
  const columns = [
    {
      title: "Date",
      dataIndex: "dt",
      sorter: (a, b) => {
        return a.dt - b.dt;
      },
      render: (value) => {
        return <label key>{getDateFromUnixTimestamp(value)}</label>;
      },
      ...getColumnSearchProps({
        dataIndex: "dt",
        placeholder: "Date",
        transformRecordFn: getDateFromUnixTimestamp
      })
    },
    {
      title: "Min Temp °F",
      dataIndex: ["temp", "min"],
      sorter: (a, b) => a.temp.min - b.temp.min,
      render: (value) => {
        return <label>{value} °F</label>;
      },
      ...getColumnSearchProps({
        getValueFn: (record) => record["temp"]["min"],
        placeholder: "Min Temp"
      })
    },
    {
      title: "Max Temp",
      dataIndex: ["temp", "max"],
      sorter: (a, b) => a.temp.max - b.temp.max,
      render: (value) => {
        return <label>{value} °F</label>;
      },
      ...getColumnSearchProps({
        getValueFn: (record) => record["temp"]["max"],
        placeholder: "Max Temp"
      })
    },
    {
      title: "Weather",
      dataIndex: ["weather", 0, "description"],
      sorter: (a, b) => a.temp.max - b.temp.max,
      render: (value) => {
        return <label>{capitalizeFirstLetter(value)}</label>;
      },
      ...getColumnSearchProps({
        getValueFn: (record) => record["weather"][0]["description"],
        placeholder: "Weatjer"
      })
    }
  ];

  function getColumnSearchProps({
    dataIndex,
    getValueFn,
    placeholder,
    transformRecordFn
  }) {
    return {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder={`Search ${placeholder}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm({ closeDropdown: false })}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => {
                confirm({ closeDropdown: false });
              }}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value, record) => {
        let recordValue = getValueFn ? getValueFn(record) : record[dataIndex];
        if (recordValue) {
          recordValue = transformRecordFn
            ? transformRecordFn(recordValue)
            : recordValue;
          return recordValue
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase());
        }
        return false;
      }
    };
  }

  return (
    <Table
      columns={columns}
      rowKey="dt"
      dataSource={data}
      pagination={false}
      loading={loading}
    />
  );
}
