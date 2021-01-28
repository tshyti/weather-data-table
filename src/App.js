import axios from "axios";
import React, { useLayoutEffect, useRef, useState } from "react";
import { Table, Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import weatherDataApi from "./util/weatherDataApi";

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park"
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park"
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park"
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park"
  }
];

export default function App() {
  const [weatherData, setWeatherData] = useState(null);

  const searchFilterInputEl = useRef(null);

  useLayoutEffect(() => {
    async function fetchWeatherData() {
      // const { data } = await weatherDataApi.get("/daily", {
      //   params: { cnt: 16, q: "London" }
      // });
      // console.log(data);
    }
    fetchWeatherData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name", "Name")
    },
    {
      title: "Age",
      dataIndex: "age",
      sorter: (a, b) => a.age - b.age,
      ...getColumnSearchProps("age", "Age")
    },
    {
      title: "Address",
      dataIndex: "address",
      sorter: (a, b) => a.address.length - b.address.length,
      ...getColumnSearchProps("address", "Address")
    }
  ];

  function getColumnSearchProps(dataIndex, placeholder) {
    return {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={searchFilterInputEl}
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
        if (record[dataIndex]) {
          return record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase());
        }
        return false;
      }
    };
  }

  function handleReset() {}

  return <Table columns={columns} dataSource={data} pagination={false} />;
}
