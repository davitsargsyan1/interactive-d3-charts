import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

import './Charts.css';

const ScatterPlot = ({ data, width = 600, height = 300 }) => {
  const svgRef = useRef();
  const [tooltip, setTooltip] = useState(null);

  useEffect(() => {
    if (!data.length) return;

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([0, innerWidth]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data)])
      .range([innerHeight, 0]);

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(
        d3
          .axisBottom(xScale)
          .ticks(data.length)
          .tickFormat(i => i + 1),
      );

    g.append('g').call(d3.axisLeft(yScale));

    const colorScale = d3
      .scaleLinear()
      .domain([0, d3.max(data)])
      .range(['#667eea', '#764ba2']);

    g.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', (_, i) => xScale(i))
      .attr('cy', d => yScale(d))
      .attr('r', 8)
      .attr('fill', d => colorScale(d))
      .attr('stroke', 'white')
      .attr('stroke-width', 2)
      .style('filter', 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))')
      .on('mouseenter', (event, d) => {
        const [x, y] = d3.pointer(event);
        setTooltip({ x: x + margin.left, y: y + margin.top, value: d });
        d3.select(event.target)
          .attr('r', 10)
          .style('filter', 'drop-shadow(0 6px 12px rgba(0,0,0,0.2))');
      })
      .on('mouseleave', event => {
        setTooltip(null);
        d3.select(event.target)
          .attr('r', 8)
          .style('filter', 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))');
      });
  }, [data, height, width]);

  return (
    <div className="chart-container" style={{ width, height }}>
      <svg ref={svgRef} width={width} height={height} />
      {tooltip && (
        <div
          className="chart-tooltip"
          style={{
            top: tooltip.y - 50,
            left: tooltip.x + 15,
          }}
        >
          <div className="tooltip-content">
            <div className="tooltip-indicator"></div>
            Value: {tooltip.value}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScatterPlot;
