import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { sankey, sankeyLinkHorizontal } from 'd3-sankey';

const SankeyDiagram = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const data = {
      nodes: [
        { name: 'Jobs Applied', index: 0 },
        { name: 'Replies', index: 1 },
        { name: 'Interview', index: 2 },
        { name: 'Offer Accepted', index: 3 },
        { name: 'Offer Turned Down', index: 4 },
        { name: 'Not Offered', index: 5 },
        { name: 'Rejected', index: 6 },
        { name: 'No Response', index: 7 },
        { name: 'No Further Action', index: 8 },
      ],
      links: [
        { source: 0, target: 1, value: 15 },
        { source: 1, target: 2, value: 9 },
        { source: 2, target: 3, value: 1 },
        { source: 2, target: 4, value: 2 },
        { source: 2, target: 5, value: 6 },
        { source: 0, target: 6, value: 5 },
        { source: 0, target: 7, value: 12 },
        { source: 1, target: 8, value: 6 },
      ],
    };

    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);

    // Access the parent container's dimensions
    const container = (svg.node() as Element).parentNode as HTMLElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const { nodes, links } = sankey()
      .nodeWidth(15)
      .nodePadding(10)
      .extent([[1, 1], [width - 1, height - 5]])(data);

    svg.attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid');

    svg.append('g')
      .selectAll('rect')
      .data(nodes)
      .join('rect')
      .attr('x', d => d.x0?? 0)
      .attr('y', d => d.y0?? 0)
      .attr('height', d => (d.y1 ?? 0) - (d.y0 ?? 0))
      .attr('width', d => (d.x1 ?? 0) - (d.x0 ?? 0))
      .attr('fill', d => {
        const colorMap: { [key: string]: string } = {
          'Jobs Applied': '#1f77b4',
          'Replies': '#ff7f0e',
          'Interview': '#2ca02c',
          'Offer Accepted': '#d62728',
          'Offer Turned Down': '#9467bd',
          'Not Offered': '#8c564b',
          'Rejected': '#e377c2',
          'No Response': '#7f7f7f',
          'No Further Action': '#bcbd22',
        };
        return colorMap[(d as any).name] || '#ccc';
      });

    svg.append('g')
      .selectAll('path')
      .data(links)
      .join('path')
      .attr('d', sankeyLinkHorizontal())
      .attr('stroke', '#aaa')
      .attr('fill', 'none')
      .attr('stroke-width', d => Math.max(1, d.width ?? 1));

    svg.append('g')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .attr('x', d => (d.x0 ?? 0) - 6)
      .attr('y', d => ((d.y1 ?? 0) + (d.y0 ?? 0)) / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'end')
      .text(d => (d as any).name)
      .attr('fill', '#000')
      .filter(d => (d.x0 ?? 0) < width / 2)
      .attr('x', d => (d.x1 ?? 0) + 6)
      .attr('text-anchor', 'start');
  }, []);

  return <svg ref={svgRef}></svg>;
};

export default SankeyDiagram;
