import { useMemo } from "react";
import { RouletteOptionType } from "src/types/roulette";

type RouletteViewerType = RouletteOptionType & {
  startAngle: number;
  endAngle: number;
};

function RouletteViewer({ rouletteOptions, isSpin }: { rouletteOptions: RouletteViewerType[], isSpin: boolean}) {
  const options = useMemo(() => rouletteOptions.map(option => {
		const centerX = 200;
		const centerY = 200;
		const radius = 160;
		console.log(option);
		const polarToCartesian = (radius: number, angleInDegrees: number) => {
			const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
			return {
				x: centerX + radius * Math.cos(angleInRadians),
				y: centerY + radius * Math.sin(angleInRadians),
			};
		};
		const calculatePath = (startAngle: number, endAngle: number, radius: number) => {
			const start = polarToCartesian(radius, endAngle);
			const end = polarToCartesian(radius, startAngle);
			const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
			return [
				'M', start.x, start.y,
				'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
				'L', centerX, centerY,
				'Z',
			].join(' ');
		};
    const pathD = calculatePath(option.startAngle, option.endAngle, radius);
    const middleAngle = (option.startAngle + option.endAngle) / 2;
    const textPosition = polarToCartesian(radius / 2, middleAngle);
    return {
      ...option,
      pathD,
      textPosition,
      middleAngle,
    };
  }), [rouletteOptions]);

	useMemo(() => {
		console.log(isSpin)
	}, [isSpin]);

  return (
		<div className={`w-[400px] h-[400px] spin-infinite`} style={{ animationPlayState: isSpin ? 'running' : 'paused' }}>
			<svg
				width="400"
				height="400"
				viewBox="0 0 400 400"
				transform="rotate(-90)"
			>
				{options.map((option, index) => (
					<g key={index}>
						<path d={option.pathD} fill={option.color} />
						<text
							x={option.textPosition.x}
							y={option.textPosition.y}
							fill="black"
							stroke="white"
							strokeWidth="0."
							textAnchor="middle"
							alignmentBaseline="middle"
							fontSize="12"
							transform={`rotate(${option.middleAngle + 90},${option.textPosition.x},${option.textPosition.y})`}
						>
							{option.name}
						</text>
					</g>
				))}
			</svg>
		</div>
  );
}

export default RouletteViewer;
