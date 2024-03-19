import React, { useRef, useState, useEffect } from "react";
import Draggable from "react-draggable";
import { Button, Modal, Tabs, Typography, Badge, Select } from "antd";
import { SettingOutlined, DownOutlined } from "@ant-design/icons";
import { Dropdown, message, Space, Input, Slider } from "antd";
import { NumericInput } from "../inputs/NumericInput";
import Icon from "../Icons";

import { useFilter } from "../../hooks/FilterHook";

// Map Tilelayer Selector

const { TabPane } = Tabs;

const Filter = (props) => {
  const { filter, setFilter } = useFilter();

  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleRef = useRef(null);

  const handleOk = (e) => {
    props.setOpen(false);
  };

  const handleCancel = (e) => {
    props.setOpen(false);
  };

  const onStart = (_event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  return (
    <>
      <Modal
        centered
        title={
          <div
            style={{
              width: "100%",
              cursor: "move",
            }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
            // fix eslintjsx-a11y/mouse-events-have-key-events
            // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
            onFocus={() => {}}
            onBlur={() => {}}
            // end
          >
            <div className="flex gap-x-1">
              <Icon iconName="filter" />
              Filter
            </div>
          </div>
        }
        open={props.isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            nodeRef={draggleRef}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        <Tabs defaultActiveKey={props.defaultKey}>
          <TabPane tab={<span>Locations</span>} key="1">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  <Badge
                    dot={
                      filter.selected.location.availability.key !==
                      filter.options.location.availability[0].key
                        ? 1
                        : 0
                    }
                    status={
                      filter.selected.location.availability.key !==
                      filter.options.location.availability[0].key
                        ? "processing"
                        : "default"
                    }
                  >
                    <span className="pr-1">Availability</span>
                  </Badge>
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <Dropdown
                    menu={{
                      items: filter.options.location.availability,
                      selectable: true,
                      selectedKeys: [filter.selected.location.availability.key],
                      onClick: (e) => {
                        setFilter((prevFilter) => ({
                          ...prevFilter,
                          selected: {
                            ...prevFilter.selected,
                            location: {
                              ...prevFilter.selected.location,
                              availability:
                                filter.options.location.availability[e.key - 1],
                            },
                          },
                        }));
                      },
                    }}
                  >
                    <Typography.Link>
                      <Space>
                        {filter.selected.location.availability.label}
                        <DownOutlined />
                      </Space>
                    </Typography.Link>
                  </Dropdown>
                </dd>
              </div>
              {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <div>
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    <Badge
                      dot={
                        filter.selected.location.distance.selectedDistance !==
                        filter.options.location.distance.selectedDistance
                          ? 1
                          : 0
                      }
                      status={
                        filter.selected.location.distance.selectedDistance !==
                        filter.options.location.distance.selectedDistance
                          ? "processing"
                          : "default"
                      }
                    >
                      <span className="pr-1">Distance</span>
                    </Badge>
                  </dt>
                  <p class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    From your map centre
                  </p>
                </div>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <Space direction="horizontal" className="w-full">
                    <Slider
                      range={{
                        draggableTrack: true,
                      }}
                      tooltip={{
                        formatter: (value) => `${value} km`,
                      }}
                      onChangeComplete={(value) => {
                        setFilter((prevFilter) => ({
                          ...prevFilter,
                          selected: {
                            ...prevFilter.selected,
                            location: {
                              ...prevFilter.selected.location,
                              distance: value,
                            },
                          },
                        }));
                      }}
                      defaultValue={
                        filter.options.location.distance.selectedDistance
                      }
                      value={filter.selected.location.distance.selectedDistance}
                      min={filter.options.location.distance.min}
                      max={filter.options.location.distance.max}
                    />
                    <Button
                      className={
                        filter.selected.location.distance.selectedDistance !==
                        filter.options.location.distance.selectedDistance
                          ? "w-auto"
                          : "w-0 p-0 opacity-0"
                      }
                      onClick={() => {
                        setFilter((prevFilter) => {
                          return {
                            ...prevFilter,
                            selected: {
                              ...prevFilter.selected,
                              location: {
                                ...prevFilter.selected.location,
                                distance: {
                                  ...prevFilter.selected.location.distance,
                                  selectedDistance:
                                    prevFilter.options.location.distance
                                      .selectedDistance,
                                },
                              },
                            },
                          };
                        });
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                        />
                      </svg>
                    </Button>
                  </Space>
                </dd>
              </div> */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  <Badge
                    dot={
                      filter.selected.location.stationType.length !==
                      filter.options.location.stationType.length
                        ? 1
                        : 0
                    }
                    status={
                      filter.selected.location.stationType.length !==
                      filter.options.location.stationType.length
                        ? "processing"
                        : "default"
                    }
                  >
                    <span className="pr-1">Station Type</span>
                  </Badge>
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <Space direction="horizontal" className="w-full">
                    <Select
                      mode={"multiple"}
                      style={{ width: "100%" }}
                      options={filter.options.location.stationType}
                      className="w-full"
                      placeholder="Select Station Types"
                      maxTagCount={"responsive"}
                      value={filter.selected.location.stationType}
                      onChange={(value) => {
                        setFilter((prevFilter) => ({
                          ...prevFilter,
                          selected: {
                            ...prevFilter.selected,
                            location: {
                              ...prevFilter.selected.location,
                              stationType: value,
                            },
                          },
                        }));
                      }}
                    />
                    <Button
                      className={
                        filter.selected.location.stationType.length !==
                        filter.options.location.stationType.length
                          ? "w-auto"
                          : "w-0 p-0 opacity-0"
                      }
                      onClick={() => {
                        setFilter((prevFilter) => {
                          return {
                            ...prevFilter,
                            selected: {
                              ...prevFilter.selected,
                              location: {
                                ...prevFilter.selected.location,
                                stationType:
                                  prevFilter.options.location.stationType,
                              },
                            },
                          };
                        });
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                        />
                      </svg>
                    </Button>
                  </Space>
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  <Badge
                    dot={
                      filter.selected.location.category.length !==
                      filter.options.location.category.length
                        ? 1
                        : 0
                    }
                    status={
                      filter.selected.location.category.length !==
                      filter.options.location.category.length
                        ? "processing"
                        : "default"
                    }
                  >
                    <span className="pr-1">Station Category</span>
                  </Badge>
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <Space direction="horizontal" className="w-full">
                    <Select
                      mode={"multiple"}
                      style={{ width: "100%" }}
                      placeholder="Select Station Types"
                      maxTagCount={"responsive"}
                      options={filter.options.location.category}
                      value={filter.selected.location.category}
                      onChange={(value) => {
                        setFilter((prevFilter) => ({
                          ...prevFilter,
                          selected: {
                            ...prevFilter.selected,
                            location: {
                              ...prevFilter.selected.location,
                              category: value,
                            },
                          },
                        }));
                      }}
                    />
                    <Button
                      className={
                        filter.selected.location.category.length !==
                        filter.options.location.category.length
                          ? "w-auto"
                          : "w-0 p-0 opacity-0"
                      }
                      onClick={() => {
                        setFilter((prevFilter) => {
                          return {
                            ...prevFilter,
                            selected: {
                              ...prevFilter.selected,
                              location: {
                                ...prevFilter.selected.location,
                                category: prevFilter.options.location.category,
                              },
                            },
                          };
                        });
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                        />
                      </svg>
                    </Button>
                  </Space>
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  <Badge
                    dot={
                      filter.selected.location.timingPoint.length !==
                      filter.options.location.timingPoint.length
                        ? 1
                        : 0
                    }
                    status={
                      filter.selected.location.timingPoint.length !==
                      filter.options.location.timingPoint.length
                        ? "processing"
                        : "default"
                    }
                  >
                    <span className="pr-1">Timing Point</span>
                  </Badge>
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <Space direction="horizontal" className="w-full">
                    <Select
                      mode={"multiple"}
                      style={{ width: "100%" }}
                      placeholder="Select Station Types"
                      maxTagCount={"responsive"}
                      options={filter.options.location.timingPoint}
                      value={filter.selected.location.timingPoint}
                      onChange={(value) => {
                        setFilter((prevFilter) => ({
                          ...prevFilter,
                          selected: {
                            ...prevFilter.selected,
                            location: {
                              ...prevFilter.selected.location,
                              timingPoint: value,
                            },
                          },
                        }));
                      }}
                    />

                    <Button
                      className={
                        filter.selected.location.timingPoint.length !==
                        filter.options.location.timingPoint.length
                          ? "w-auto"
                          : "w-0 p-0 opacity-0"
                      }
                      onClick={() => {
                        setFilter((prevFilter) => {
                          return {
                            ...prevFilter,
                            selected: {
                              ...prevFilter.selected,
                              location: {
                                ...prevFilter.selected.location,
                                timingPoint:
                                  prevFilter.options.location.timingPoint,
                              },
                            },
                          };
                        });
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                        />
                      </svg>
                    </Button>
                  </Space>
                </dd>
              </div>
            </dl>
          </TabPane>
        </Tabs>
      </Modal>
    </>
  );
};
export default Filter;
