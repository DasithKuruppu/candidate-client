import React from "react";
import { Table } from "antd";
import { getColumnSearchProps } from "./searchInput";

export const List = ({
  data,
  onFilterChange,
  pagination = {},
  isLoading,
  availableTechnologies=[]
}) => {
  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      width: "auto",
      ...getColumnSearchProps("firstName")
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      width: "auto",
      ...getColumnSearchProps("lastName")
    },
    {
      title: "Description",
      dataIndex: "description",
      width: "auto",
      ...getColumnSearchProps("description")
    },
    {
      title: "Technologies",
      dataIndex: "skills",
      filters: availableTechnologies.map(tech => {
        return { text: tech, value: tech };
      }),
      render: technologyList =>
        technologyList.map(technology => technology.name).join(","),
      width: "auto"
    },
    {
      title: "Experience",
      dataIndex: "experience",
      render: experience => `${(experience / 12).toString()} years`,
      width: "auto",
      ...getColumnSearchProps("experience")
    }
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    const listOfAttributesToTransform = [
      "firstName",
      "lastName",
      "description",
      "experience"
    ];

    let transformedfilters = { ...filters };
    Object.keys(filters).forEach(key => {
      if (key === "skills") {
        delete transformedfilters[key];
        transformedfilters["technology"] = filters[`skills`];
      }
      if (listOfAttributesToTransform.includes(key)) {
        transformedfilters[key] = transformedfilters[key][0];
      }
    });
    onFilterChange(transformedfilters);
  };
  return (
    <Table
      columns={columns}
      rowKey={record => record.id}
      dataSource={data}
      pagination={pagination}
      loading={isLoading}
      onChange={handleTableChange}
    />
  );
};
