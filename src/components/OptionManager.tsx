// components/OptionManager.tsx
import React from 'react';
import { Form, Input, InputNumber, Button, ColorPicker, Space } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import type { Color } from 'antd/es/color-picker';

interface WheelOption {
  range: number;
  background: string;
  fonts?: Array<{
    text: string;
    top?: string | number;
    fontColor?: string;
    fontSize?: string | number;
    fontWeight?: string | number;
  }>;
  imgs?: Array<{
    src: string;
    width?: string | number;
    height?: string | number;
    top?: string | number;
  }>;
}

interface WheelButton {
  radius: string;
  background: string;
  pointer?: boolean;
  fonts?: Array<{
    text: string;
    top?: string | number;
    fontColor?: string;
    fontSize?: string | number;
    fontWeight?: string | number;
  }>;
}

interface OptionManagerProps {
  options: WheelOption[];
  setOptions: React.Dispatch<React.SetStateAction<WheelOption[]>>;
  buttons: WheelButton[];
  setButtons: React.Dispatch<React.SetStateAction<WheelButton[]>>;
}

const OptionManager: React.FC<OptionManagerProps> = ({ options, setOptions, buttons, setButtons }) => {
  const [form] = Form.useForm();

  const convertColorToHex = (color: Color | string | undefined): string | undefined => {
    if (!color) return undefined;
    if (typeof color === 'string') return color;
    if (typeof color === 'object' && 'toHexString' in color) {
      return color.toHexString();
    }
    console.warn('无法转换颜色:', color);
    return undefined;
  };

  const onFinish = (values: { options: WheelOption[] }) => {
    const processedOptions = values.options.map(option => ({
      ...option,
      background: convertColorToHex(option.background as Color | string),
      fonts: option.fonts?.map(font => ({
        ...font,
        fontColor: convertColorToHex(font.fontColor as Color | string)
      }))
    }));
    // 确保 processedOptions 的类型与 WheelOption[] 一致
    const typedProcessedOptions: WheelOption[] = processedOptions.map(option => ({
      ...option,
      background: option.background || '#FFFFFF', // 使用默认颜色而不是空字符串
      fonts: option.fonts?.map(font => ({
        ...font,
        fontColor: font.fontColor || undefined,
        fontSize: font.fontSize || undefined,
        fontWeight: font.fontWeight || undefined
      }))
    }));
    setOptions(typedProcessedOptions);
    console.log(typedProcessedOptions);
  };

  const handleButtonChange = (index: number, field: keyof WheelButton, value: string) => {
    setButtons(prevButtons => {
      const newButtons = [...prevButtons];
      newButtons[index] = { ...newButtons[index], [field]: value };
      return newButtons;
    });
  };

  return (
    <div>
      <Form form={form} onFinish={onFinish} initialValues={{ options }}>
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <Form.Item
                    {...field}
                    name={[field.name, 'fonts', 0, 'text']}
                    label="文本"
                    rules={[{ required: true, message: '请输入文本' }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    name={[field.name, 'range']}
                    label="范围"
                    rules={[{ required: true, message: '请输入范围' }]}
                  >
                    <InputNumber min={1} />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    name={[field.name, 'background']}
                    label="背景色"
                    rules={[{ required: true, message: '请选择背景色' }]}
                  >
                    <ColorPicker />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    name={[field.name, 'fonts', 0, 'fontColor']}
                    label="字体颜色"
                  >
                    <ColorPicker />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    name={[field.name, 'fonts', 0, 'fontSize']}
                    label="字体大小"
                  >
                    <InputNumber min={1} />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            保存更改
          </Button>
        </Form.Item>
      </Form>
      <h3>按钮设置</h3>
      {buttons.map((button, index) => (
        <div key={index}>
          <input
            type="text"
            value={button.radius}
            onChange={(e) => handleButtonChange(index, 'radius', e.target.value)}
            placeholder="半径"
          />
          <input
            type="color"
            value={button.background}
            onChange={(e) => handleButtonChange(index, 'background', e.target.value)}
          />
        </div>
      ))}
      <button onClick={() => setButtons([...buttons, { radius: '30%', background: '#ffffff' }])}>
        添加按钮
      </button>
    </div>
  );
};

export default OptionManager;