import React, { useRef, useState, useEffect } from "react";
import Draggable from "react-draggable";
import { Button, Modal, Tabs, Typography, Badge, Select, Radio } from "antd";
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

  // dot={
  //   filter.selected.routes.train.cancelled.key !==
  //   filter.options.routes.train.cancelled[0].key
  //     ? 1
  //     : 0
  // }
  // status={
  //   filter.selected.routes.train.cancelled.key !==
  //   filter.options.routes.train.cancelled[0].key
  //     ? "processing"
  //     : "default"
  // }

  const showDot = (type = "train") => {
    let showDot = 0;
    let status = "default";

    // console.log(filter.selected.routes[type]);

    Object.entries(filter.selected.routes[type]).forEach(([key, value]) => {
      if (
        JSON.stringify(filter.options.routes[type][key][0]) !==
        JSON.stringify(filter.selected.routes[type][key])
      ) {
        showDot = 1;
        status = "processing";
      }
    });

    return {
      dot: showDot,
      status: status,
    };
  };

  return (
    <>
      <Modal
        width={600}
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
        className={props.isOpen ? "open" : ""}
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
          <TabPane tab={<span>Routes</span>} key="2">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  <Badge
                    dot={
                      filter.selected.routes.lastReportedType.length !==
                      filter.options.routes.lastReportedType.length
                        ? 1
                        : 0
                    }
                    status={
                      filter.selected.routes.lastReportedType.length !==
                      filter.options.routes.lastReportedType.length
                        ? "processing"
                        : "default"
                    }
                  >
                    <span className="pr-1">Last Reported Type</span>
                  </Badge>
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <Space direction="horizontal" className="w-full">
                    <Select
                      mode={"multiple"}
                      style={{ width: "100%" }}
                      placeholder="Select Station Types"
                      maxTagCount={"responsive"}
                      options={filter.options.routes.lastReportedType}
                      value={filter.selected.routes.lastReportedType}
                      onChange={(value) => {
                        setFilter((prevFilter) => ({
                          ...prevFilter,
                          selected: {
                            ...prevFilter.selected,
                            routes: {
                              ...prevFilter.selected.routes,
                              lastReportedType: value,
                            },
                          },
                        }));
                      }}
                    />

                    <Button
                      className={
                        filter.selected.routes.lastReportedType.length !==
                        filter.options.routes.lastReportedType.length
                          ? "w-auto"
                          : "w-0 p-0 opacity-0"
                      }
                      onClick={() => {
                        setFilter((prevFilter) => {
                          return {
                            ...prevFilter,
                            selected: {
                              ...prevFilter.selected,
                              routes: {
                                ...prevFilter.selected.routes,
                                lastReportedType:
                                  prevFilter.options.routes.lastReportedType,
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
                      filter.selected.routes.offRoute.key !==
                      filter.options.routes.offRoute[0].key
                        ? 1
                        : 0
                    }
                    status={
                      filter.selected.routes.offRoute.key !==
                      filter.options.routes.offRoute[0].key
                        ? "processing"
                        : "default"
                    }
                  >
                    <span className="pr-1">Off Route</span>
                  </Badge>
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <Dropdown
                    menu={{
                      items: filter.options.routes.offRoute,
                      selectable: true,
                      selectedKeys: [filter.selected.routes.offRoute.key],
                      onClick: (e) => {
                        setFilter((prevFilter) => ({
                          ...prevFilter,
                          selected: {
                            ...prevFilter.selected,
                            routes: {
                              ...prevFilter.selected.routes,
                              offRoute:
                                filter.options.routes.offRoute[e.key - 1],
                            },
                          },
                        }));
                      },
                    }}
                  >
                    <Typography.Link>
                      <Space>
                        {filter.selected.routes.offRoute.label}
                        <DownOutlined />
                      </Space>
                    </Typography.Link>
                  </Dropdown>
                </dd>
              </div>
              <div className="py-6 ">
                <Tabs tabPosition="left" defaultActiveKey="a">
                  <TabPane
                    tab={
                      <span>
                        <Badge dot={showDot().dot} status={showDot().status}>
                          <span className="pr-1">Train</span>
                        </Badge>
                      </span>
                    }
                    key="a"
                  >
                    <div>
                      <Radio.Group
                        onChange={(e) => {
                          setFilter((prevFilter) => ({
                            ...prevFilter,
                            selected: {
                              ...prevFilter.selected,
                              routes: {
                                ...prevFilter.selected.routes,
                                train: {
                                  ...prevFilter.selected.routes.train,
                                  cancelled:
                                    filter.options.routes.train.cancelled[
                                      e.target.value - 1
                                    ],
                                },
                              },
                            },
                          }));
                        }}
                        value={filter.selected.routes.train.cancelled.key}
                        buttonStyle="solid"
                      >
                        {filter.options.routes.train.cancelled.map(
                          (item, index) => (
                            <Radio.Button value={item.key} key={index}>
                              {item.label}
                            </Radio.Button>
                          )
                        )}
                      </Radio.Group>
                    </div>
                    <div className="mt-4">
                      <Radio.Group
                        onChange={(e) => {
                          setFilter((prevFilter) => ({
                            ...prevFilter,
                            selected: {
                              ...prevFilter.selected,
                              routes: {
                                ...prevFilter.selected.routes,
                                train: {
                                  ...prevFilter.selected.routes.train,
                                  cancelledEnRoutes:
                                    filter.options.routes.train
                                      .cancelledEnRoutes[e.target.value - 1],
                                },
                              },
                            },
                          }));
                        }}
                        value={
                          filter.selected.routes.train.cancelledEnRoutes.key
                        }
                        buttonStyle="solid"
                      >
                        {filter.options.routes.train.cancelledEnRoutes.map(
                          (item, index) => (
                            <Radio.Button value={item.key} key={index}>
                              {item.label}
                            </Radio.Button>
                          )
                        )}
                      </Radio.Group>
                    </div>
                    <div className="mt-4">
                      <Radio.Group
                        onChange={(e) => {
                          setFilter((prevFilter) => ({
                            ...prevFilter,
                            selected: {
                              ...prevFilter.selected,
                              routes: {
                                ...prevFilter.selected.routes,
                                train: {
                                  ...prevFilter.selected.routes.train,
                                  cancelledImmediately:
                                    filter.options.routes.train
                                      .cancelledImmediately[e.target.value - 1],
                                },
                              },
                            },
                          }));
                        }}
                        value={
                          filter.selected.routes.train.cancelledImmediately.key
                        }
                        buttonStyle="solid"
                      >
                        {filter.options.routes.train.cancelledImmediately.map(
                          (item, index) => (
                            <Radio.Button value={item.key} key={index}>
                              {item.label}
                            </Radio.Button>
                          )
                        )}
                      </Radio.Group>
                    </div>
                    <div className="mt-4">
                      <Radio.Group
                        onChange={(e) => {
                          setFilter((prevFilter) => ({
                            ...prevFilter,
                            selected: {
                              ...prevFilter.selected,
                              routes: {
                                ...prevFilter.selected.routes,
                                train: {
                                  ...prevFilter.selected.routes.train,
                                  cancelledOutOfPlan:
                                    filter.options.routes.train
                                      .cancelledOutOfPlan[e.target.value - 1],
                                },
                              },
                            },
                          }));
                        }}
                        value={
                          filter.selected.routes.train.cancelledOutOfPlan.key
                        }
                        buttonStyle="solid"
                      >
                        {filter.options.routes.train.cancelledOutOfPlan.map(
                          (item, index) => (
                            <Radio.Button value={item.key} key={index}>
                              {item.label}
                            </Radio.Button>
                          )
                        )}
                      </Radio.Group>
                    </div>
                    <div className="mt-4">
                      <Radio.Group
                        onChange={(e) => {
                          setFilter((prevFilter) => ({
                            ...prevFilter,
                            selected: {
                              ...prevFilter.selected,
                              routes: {
                                ...prevFilter.selected.routes,
                                train: {
                                  ...prevFilter.selected.routes.train,
                                  shouldHaveDepartedException:
                                    filter.options.routes.train
                                      .shouldHaveDepartedException[
                                      e.target.value - 1
                                    ],
                                },
                              },
                            },
                          }));
                        }}
                        value={
                          filter.selected.routes.train
                            .shouldHaveDepartedException.key
                        }
                        buttonStyle="solid"
                      >
                        {filter.options.routes.train.shouldHaveDepartedException.map(
                          (item, index) => (
                            <Radio.Button value={item.key} key={index}>
                              {item.label}
                            </Radio.Button>
                          )
                        )}
                      </Radio.Group>
                    </div>
                  </TabPane>
                  <TabPane
                    tab={
                      <span>
                        <Badge
                          dot={showDot("schedule").dot}
                          status={showDot("schedule").status}
                        >
                          <span className="pr-1">Schedule</span>
                        </Badge>
                      </span>
                    }
                    key="b"
                  >
                    <div>
                      <Radio.Group
                        onChange={(e) => {
                          setFilter((prevFilter) => ({
                            ...prevFilter,
                            selected: {
                              ...prevFilter.selected,
                              routes: {
                                ...prevFilter.selected.routes,
                                schedule: {
                                  ...prevFilter.selected.routes.schedule,
                                  hasSchedule:
                                    filter.options.routes.schedule.hasSchedule[
                                      e.target.value - 1
                                    ],
                                },
                              },
                            },
                          }));
                        }}
                        value={filter.selected.routes.schedule.hasSchedule.key}
                        buttonStyle="solid"
                      >
                        {filter.options.routes.schedule.hasSchedule.map(
                          (item, index) => (
                            <Radio.Button value={item.key} key={index}>
                              {item.label}
                            </Radio.Button>
                          )
                        )}
                      </Radio.Group>
                    </div>
                    <div className="mt-4">
                      <Radio.Group
                        onChange={(e) => {
                          setFilter((prevFilter) => ({
                            ...prevFilter,
                            selected: {
                              ...prevFilter.selected,
                              routes: {
                                ...prevFilter.selected.routes,
                                schedule: {
                                  ...prevFilter.selected.routes.schedule,
                                  scheduleCancelled:
                                    filter.options.routes.schedule
                                      .scheduleCancelled[e.target.value - 1],
                                },
                              },
                            },
                          }));
                        }}
                        value={
                          filter.selected.routes.schedule.scheduleCancelled.key
                        }
                        buttonStyle="solid"
                      >
                        {filter.options.routes.schedule.scheduleCancelled.map(
                          (item, index) => (
                            <Radio.Button value={item.key} key={index}>
                              {item.label}
                            </Radio.Button>
                          )
                        )}
                      </Radio.Group>
                    </div>
                    <div className="mt-4">
                      <Radio.Group
                        onChange={(e) => {
                          setFilter((prevFilter) => ({
                            ...prevFilter,
                            selected: {
                              ...prevFilter.selected,
                              routes: {
                                ...prevFilter.selected.routes,
                                schedule: {
                                  ...prevFilter.selected.routes.schedule,
                                  scheduleJustForToday:
                                    filter.options.routes.schedule
                                      .scheduleJustForToday[e.target.value - 1],
                                },
                              },
                            },
                          }));
                        }}
                        value={
                          filter.selected.routes.schedule.scheduleJustForToday
                            .key
                        }
                        buttonStyle="solid"
                      >
                        {filter.options.routes.schedule.scheduleJustForToday.map(
                          (item, index) => (
                            <Radio.Button value={item.key} key={index}>
                              {item.label}
                            </Radio.Button>
                          )
                        )}
                      </Radio.Group>
                    </div>
                  </TabPane>
                </Tabs>
              </div>
            </dl>
          </TabPane>
        </Tabs>
      </Modal>
    </>
  );
};
export default Filter;
