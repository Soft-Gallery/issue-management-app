import React from 'react';
import PropTypes from 'prop-types';
import { Svg, Circle, Text } from 'react-native-svg';
import { WINDOW_WIDTH } from "../const/window";

const BubbleChart = ({ data }) => {
    const width = WINDOW_WIDTH;  // Adjust as needed
    const height = 420;  // Adjust as needed
    const maxRadius = 50;

    // Define a set of colors for the bubbles
    const colors = [
        "#FF6347", // Tomato
        "#FF4500", // OrangeRed
        "#FFD700", // Gold
        "#ADFF2F", // GreenYellow
        "#32CD32", // LimeGreen
        "#00FA9A", // MediumSpringGreen
        "#00CED1", // DarkTurquoise
        "#1E90FF", // DodgerBlue
        "#9370DB", // MediumPurple
        "#FF1493", // DeepPink
    ];

    // Convert data object to an array of objects
    const dataArray = Object.keys(data).map(key => ({ text: key, value: data[key] }));

    // Calculate the total value for proportional radius calculation
    const totalValue = dataArray.reduce((acc, d) => acc + d.value, 0);

    // Calculate positions and radii for bubbles
    const bubbles = dataArray.map((d, index) => {
        const radius = d.value > 0 ? Math.sqrt(d.value / totalValue) * maxRadius * 2 : 0; // Proportional radius calculation
        const angle = (index / dataArray.length) * 2 * Math.PI;
        const x = width / 2 + Math.cos(angle) * (width / 4);
        const y = height / 2 + Math.sin(angle) * (height / 4);
        const color = colors[index % colors.length]; // Assign a color in a round-robin fashion

        return { ...d, radius, x, y, color };
    });

    return (
        <Svg width={width} height={height}>
            {bubbles.map((bubble, index) => (
                bubble.radius > 0 && (
                    <React.Fragment key={index}>
                        <Circle cx={bubble.x} cy={bubble.y} r={bubble.radius} fill={bubble.color} />
                        <Text
                            x={bubble.x}
                            y={bubble.y}
                            textAnchor="middle"
                            dy=".3em"
                            fill="white"
                            fontSize={bubble.radius / 3}
                            fontWeight={"bold"}
                        >
                            {bubble.text}
                        </Text>
                    </React.Fragment>
                )
            ))}
        </Svg>
    );
};

BubbleChart.propTypes = {
    data: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default BubbleChart;

