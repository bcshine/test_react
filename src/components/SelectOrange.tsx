import React, { useState } from 'react';
import { ORANGE_COLORS } from '../types';
import './SelectOrange.css';

interface SelectOrangeProps {
  onSelect: (index: number) => void;
}

const SelectOrange: React.FC<SelectOrangeProps> = ({ onSelect }) => {
  const [hoveredOrange, setHoveredOrange] = useState<number | null>(null);

  return (
    <div className="select-orange">
      <div className="tree-container">
        <div className="orange-tree">
          <div className="tree-trunk">🌳</div>
          <div className="oranges-container">
            {ORANGE_COLORS.map((color, index) => (
              <div
                key={index}
                className={`orange orange-${index + 1} ${
                  hoveredOrange === index ? 'shake' : ''
                }`}
                style={{ backgroundColor: color }}
                onMouseEnter={() => setHoveredOrange(index)}
                onMouseLeave={() => setHoveredOrange(null)}
                onClick={() => onSelect(index)}
              >
                🍊
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="instruction">
        <h2>귤 하나 골라주세요!</h2>
      </div>
    </div>
  );
};

export default SelectOrange; 