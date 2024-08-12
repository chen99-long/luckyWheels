interface WheelOption {
    label: string;
    probability: number;
    color: string;
  }
  
  interface OptionManagerProps {
    options: WheelOption[];
    setOptions: React.Dispatch<React.SetStateAction<WheelOption[]>>;
  }