import { useMemo, useState } from "react";
import { RouletteOptionType } from "src/types/roulette";
import RouletteViewer from "./rouletteViewer";

type RouletteProps = {
  options: RouletteOptionType[],
  vulnerability: boolean,
}

function Roulette({ options, vulnerability }: RouletteProps) {
  const [isSpin, setIsSpin] = useState(false);

  console.info(vulnerability);
  const totalRange = useMemo(() => options.reduce((total, option) => total + option.range, 0), [options]);
  const endRanges = useMemo(() => options.reduce((acc, option, index) => {
    acc.push(index === 0 ? option.range : acc[index - 1] + option.range);
    return acc;
  }, [] as number[]), [options]);

  const RouletteOptions = useMemo(() => {
    return options.map((option, index) => {
      const startRange = index === 0 ? 0 : endRanges[index - 1];
      const endRange = endRanges[index];
      const startAngle = (startRange / totalRange) * 360;
      const endAngle = (endRange / totalRange) * 360;
      const color = option.color?? getRandomColor();
      return {
        ...option,
        color,
        startAngle,
        endAngle,
      };
    });
  }, [options, endRanges, totalRange]);


  const toggleSpin = () => {
    setIsSpin(!isSpin);
  };
  console.log(totalRange);
  console.log(RouletteOptions);

  return (
    <div>
      <RouletteViewer isSpin={isSpin} rouletteOptions={RouletteOptions} />
      <button onClick={toggleSpin}>{isSpin ? 'Stop' : 'Spin'}</button>
    </div>
  );
}

const getRandomColor = () => {
  const letters = '0123456789ABCD';
  const color = ['#'];
  for (let i = 0; i < 6; i++) {
    color.push(letters[Math.floor(Math.random() * letters.length)]);
  }
  return color.join('');
};

export default Roulette;
