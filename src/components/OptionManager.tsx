// components/OptionManager.tsx
import React, { useState } from 'react';
import styled from '@emotion/styled';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
  margin-right: 5px;
`;

const OptionList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const OptionItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;


const OptionManager: React.FC<OptionManagerProps> = ({ options, setOptions }) => {
  const [newLabel, setNewLabel] = useState('');
  const [newProbability, setNewProbability] = useState('');
  const [newColor, setNewColor] = useState('#000000');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const addOrUpdateOption = (e: React.FormEvent) => {
    e.preventDefault();
    if (newLabel && newProbability) {
      const newOption = {
        label: newLabel,
        probability: parseFloat(newProbability),
        color: newColor
      };

      if (editingIndex !== null) {
        // Update existing option
        const updatedOptions = [...options];
        updatedOptions[editingIndex] = newOption;
        setOptions(updatedOptions);
        setEditingIndex(null);
      } else {
        // Add new option
        setOptions([...options, newOption]);
      }

      setNewLabel('');
      setNewProbability('');
      setNewColor('#000000');
    }
  };

  const startEditing = (index: number) => {
    const option = options[index];
    setNewLabel(option.label);
    setNewProbability(option.probability.toString());
    setNewColor(option.color);
    setEditingIndex(index);
  };

  const cancelEditing = () => {
    setNewLabel('');
    setNewProbability('');
    setNewColor('#000000');
    setEditingIndex(null);
  };

  const removeOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
    if (editingIndex === index) {
      cancelEditing();
    }
  };

  return (
    <div>
      <Form onSubmit={addOrUpdateOption}>
        <Input
          type="text"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          placeholder="选项名称"
          required
        />
        <Input
          type="number"
          value={newProbability}
          onChange={(e) => setNewProbability(e.target.value)}
          placeholder="概率 (0-1)"
          step="0.1"
          min="0"
          max="1"
          required
        />
        <Input
          type="color"
          value={newColor}
          onChange={(e) => setNewColor(e.target.value)}
        />
        <Button type="submit">
          {editingIndex !== null ? '更新选项' : '添加选项'}
        </Button>
        {editingIndex !== null && (
          <Button type="button" onClick={cancelEditing}>取消编辑</Button>
        )}
      </Form>
      <OptionList>
        {options.map((option, index) => (
          <OptionItem key={index}>
            <span style={{color: option.color}}>
              {option.label} (概率: {option.probability})
            </span>
            <div>
              <Button onClick={() => startEditing(index)}>编辑</Button>
              <Button onClick={() => removeOption(index)}>删除</Button>
            </div>
          </OptionItem>
        ))}
      </OptionList>
    </div>
  );
};

export default OptionManager;