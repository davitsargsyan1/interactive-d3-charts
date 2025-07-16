import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

import './Charts.css';

const AreaChart = ({ data, width = 600, height = 300 }) => {
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

    const defs = svg.append('defs');

    const areaGradient = defs
      .append('linearGradient')
      .attr('id', 'areaGradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');

    areaGradient
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#667eea')
      .attr('stop-opacity', 0.8);

    areaGradient
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#764ba2')
      .attr('stop-opacity', 0.1);

    const lineGradient = defs
      .append('linearGradient')
      .attr('id', 'lineGradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%');

    lineGradient.append('stop').attr('offset', '0%').attr('stop-color', '#667eea');

    lineGradient.append('stop').attr('offset', '100%').attr('stop-color', '#764ba2');

    const area = d3
      .area()
      .x((d, i) => xScale(i))
      .y0(innerHeight)
      .y1(d => yScale(d))
      .curve(d3.curveMonotoneX);

    g.append('path')
      .datum(data)
      .attr('fill', 'url(#areaGradient)')
      .attr('d', area)
      .style('filter', 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))');

    const line = d3
      .line()
      .x((d, i) => xScale(i))
      .y(d => yScale(d))
      .curve(d3.curveMonotoneX);

    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'url(#lineGradient)')
      .attr('stroke-width', 3)
      .attr('d', line);

    g.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', (_, i) => xScale(i))
      .attr('cy', d => yScale(d))
      .attr('r', 5)
      .attr('fill', 'white')
      .attr('stroke', '#667eea')
      .attr('stroke-width', 2)
      .style('filter', 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))')
      .on('mouseenter', (event, d) => {
        const [x, y] = d3.pointer(event);
        setTooltip({ x: x + margin.left, y: y + margin.top, value: d });
        d3.select(event.target)
          .attr('r', 7)
          .attr('stroke', '#764ba2')
          .style('filter', 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))');
      })
      .on('mouseleave', event => {
        setTooltip(null);
        d3.select(event.target)
          .attr('r', 5)
          .attr('stroke', '#667eea')
          .style('filter', 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))');
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

export default AreaChart;
