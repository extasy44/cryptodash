import React, { useContext } from 'react';
import highChartsConfig from './highChartsConfig';
import { Tile } from '../Shared/Tiles';
import { AppContext } from '../App/AppProvider';
import ReactHighcharts from 'react-highcharts';
import HighChartsTheme from './HighChartsTheme';

ReactHighcharts.Highcharts.setOptions(HighChartsTheme);

const PriceChart = () => {
  const { state } = useContext(AppContext);

  return (
    <Tile>
      <ReactHighcharts config={highChartsConfig(state.historical)} />;
    </Tile>
  );
};

export default PriceChart;
