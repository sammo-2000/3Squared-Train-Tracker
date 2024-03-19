import { Input, Tooltip, Tabs } from "antd";

const { TabPane } = Tabs;

const formatNumber = (value) => new Intl.NumberFormat().format(value);

const NumericInput = (props) => {
  const { value, onChange, popSuffix, popPrefix } = props;
  const handleChange = (e) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === "" || inputValue === "-") {
      onChange(inputValue);
    }
  };

  // '.' at the end or only '-' in the input box.
  const handleBlur = () => {
    if (value && typeof value === "string") {
      let valueTemp = value;
      if (value.charAt(value.length - 1) === "." || value === "-") {
        valueTemp = value.slice(0, -1);
      }
      onChange(valueTemp.replace(/0*(\d+)/, "$1"));
    }
  };

  const title = value ? (
    <span className="numeric-input-title">
      {popPrefix ? popPrefix : null}
      {value !== "-" ? formatNumber(Number(value)) : "-"}
      {popSuffix ? popSuffix : null}
    </span>
  ) : (
    "Input a number"
  );

  return (
    <Tooltip
      trigger={["focus"]}
      autoAdjustOverflow={true}
      title={title}
      placement="topLeft"
      overlayClassName="numeric-input"
    >
      <Input
        {...props}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Input a number"
        maxLength={16}
        suffix={false}
        prefix={false}
      />
    </Tooltip>
  );
};

export { NumericInput };
