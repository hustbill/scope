import React from 'react';
import { connect } from 'react-redux';

import Logo from '../components/logo';
import NodesChartElements from './nodes-chart-elements';
import CachableZoomWrapper from '../components/cachable-zoom-wrapper';
import { clickBackground } from '../actions/app-actions';


class NodesChart extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleMouseClick = this.handleMouseClick.bind(this);
  }

  render() {
    // TODO: What to do with empty?
    const { isEmpty, selectedNodeId } = this.props;
    const svgClassNames = isEmpty ? 'hide' : '';

    return (
      <div className="nodes-chart">
        <svg
          width="100%" height="100%"
          id="nodes-chart-canvas"
          className={svgClassNames}
          onClick={this.handleMouseClick}>
          <Logo transform="translate(24,24) scale(0.25)" />
          <CachableZoomWrapper disabled={selectedNodeId}>
            <NodesChartElements />
          </CachableZoomWrapper>
        </svg>
      </div>
    );
  }

  handleMouseClick() {
    if (this.props.selectedNodeId) {
      this.props.clickBackground();
    }
  }
}


function mapStateToProps(state) {
  return {
    selectedNodeId: state.get('selectedNodeId'),
  };
}


export default connect(
  mapStateToProps,
  { clickBackground }
)(NodesChart);
