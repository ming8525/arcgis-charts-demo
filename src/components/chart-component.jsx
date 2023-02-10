import React from 'react';
import { applyPolyfills, defineCustomElements } from '@arcgis/charts-components/dist/loader'

applyPolyfills().then(() => {
  defineCustomElements(window, { resourcesUrl: '../arcgis-charts/' })
})

const getSeriesType = (config) => {
  return config?.series?.[0]?.type
}

const useForkChartRef = (ref, chartRef) => {
  const handleRef = React.useMemo(() => {
    if (ref == null && chartRef == null) {
      return null
    }
    return element => {
      ref.current = element
      if (typeof chartRef === 'function') {
        chartRef(element)
      } else if (chartRef != null) {
        chartRef.current = element
      }
    }
  }, [ref, chartRef])

  return handleRef
}

const useRegisterEvent = (nodeRef, eventName, callback) => {
  React.useEffect(() => {
    const node = nodeRef?.current
    if (node && eventName && callback) {
      node.addEventListener(eventName, callback)
    }

    return () => {
      if (node && eventName && callback) {
        node.removeEventListener(eventName, callback)
      }
    }
  }, [eventName, nodeRef, callback])
}

const getChartComponentTag = (seriesType) => {
  if (seriesType === 'barSeries') {
    return 'arcgis-charts-bar-chart'
  } else if (seriesType === 'lineSeries') {
    return 'arcgis-charts-line-chart'
  } else if (seriesType === 'pieSeries') {
    return 'arcgis-charts-pie-chart'
  } else if (seriesType === 'scatterSeries') {
    return 'arcgis-charts-scatter-plot'
  } else if (seriesType === 'histogramSeries') {
    return 'arcgis-charts-histogram'
  } else {
    return 'div'
  }
}

const defaultChartLimits = { maxBarUniqueSeriesCountTotal: 1000, maxBarTwoSeriesCountTotal: 1000, maxBarThreePlusSeriesCountTotal: 1000, maxPieChartSliceCountTotal: 300 }

export const ChartComponent = React.forwardRef((props, chartRef) => {
  const ref = React.useRef(null)
  const handleRef = useForkChartRef(ref, chartRef)

  const {
    className,
    config,
    featureLayer,
    inlineData,

    runtimeDataFilters,
    selectionData,
    chartLimits = defaultChartLimits,
    actionMode,
    noDataOptions,
    placeholder: createMessage,

    autoDisposeChart = true,
    enableResponsiveFeatures = false,
    hideLicenceWatermark = true,
    queueChartCreation = true,
    useAnimatedCharts = false,
    hideLoaderAnimation = true,

    arcgisChartsDataProcessComplete,
    arcgisChartsLegendItemVisibilityChange,
    arcgisChartsUpdateComplete,
    arcgisChartsSeriesColorChange,
    arcgisChartsAxesMinMaxChange,
    arcgisChartsDefaultActionSelect,
    arcgisChartsSelectionComplete,
    arcgisChartsActionBarToggle,
    arcgisChartsNoRenderPropChange
  } = props

  const seriesType = getSeriesType(config)
  const component = getChartComponentTag(seriesType)


  React.useEffect(() => {
    ref.current.config = config
    //If update config and inline-data(feature layer) at the same time, the update of data will be ignored
    if (ref.current) {
      if (featureLayer) {
        ref.current.featureLayer = featureLayer
      } else {
        ref.current.inlineData = inlineData
      }
    }
  }, [config, featureLayer])

  React.useEffect(() => {
    ref.current.runtimeDataFilters = runtimeDataFilters
  }, [runtimeDataFilters])

  React.useEffect(() => {
    ref.current.selectionData = selectionData
    ref.current.chartLimits = chartLimits
    ref.current.actionMode = actionMode
    ref.current.createMessage = createMessage
  }, [
    selectionData,
    chartLimits,
    actionMode,
    createMessage
  ])

  React.useEffect(() => {
    ref.current.noDataOptions = noDataOptions
  }, [noDataOptions])

  React.useEffect(() => {
    ref.current.autoDisposeChart = autoDisposeChart
    ref.current.enableResponsiveFeatures = enableResponsiveFeatures
    ref.current.hideLicenceWatermark = hideLicenceWatermark
    ref.current.queueChartCreation = queueChartCreation
    ref.current.useAnimatedCharts = useAnimatedCharts
    ref.current.hideLoaderAnimation = hideLoaderAnimation
  }, [
    autoDisposeChart,
    enableResponsiveFeatures,
    hideLicenceWatermark,
    queueChartCreation,
    useAnimatedCharts,
    hideLoaderAnimation
  ])

  useRegisterEvent(ref, 'arcgisChartsDataProcessComplete', arcgisChartsDataProcessComplete)
  useRegisterEvent(ref, 'arcgisChartsLegendItemVisibilityChange', arcgisChartsLegendItemVisibilityChange)
  useRegisterEvent(ref, 'arcgisChartsUpdateComplete', arcgisChartsUpdateComplete)
  useRegisterEvent(ref, 'arcgisChartsSeriesColorChange', arcgisChartsSeriesColorChange)
  useRegisterEvent(ref, 'arcgisChartsDefaultActionSelect', arcgisChartsDefaultActionSelect)
  useRegisterEvent(ref, 'arcgisChartsSelectionComplete', arcgisChartsSelectionComplete)
  useRegisterEvent(ref, 'arcgisChartsActionBarToggle', arcgisChartsActionBarToggle)
  useRegisterEvent(ref, 'arcgisChartsNoRenderPropChange', arcgisChartsNoRenderPropChange)

  if (seriesType === 'barSeries') {
    return <BarChart ref={handleRef} className={className} />
  } else if (seriesType === 'lineSeries') {
    return <LineChart ref={handleRef} className={className} />
  } else if (seriesType === 'pieSeries') {
    return <PieChart ref={handleRef} className={className} />
  } else if (seriesType === 'scatterSeries') {
    return <ScatterPlotChart ref={handleRef} className={className} />
  } else if (seriesType === 'histogramSeries') {
    return <HistogramChart ref={handleRef} className={className} />
  }
})

const BarChart = React.forwardRef((props, ref) => {
  return <arcgis-charts-bar-chart {...props} ref={ref} />
})
const LineChart = React.forwardRef((props, ref) => {
  return <arcgis-charts-line-chart {...props} ref={ref} />
})
const PieChart = React.forwardRef((props, ref) => {
  return <arcgis-charts-pie-chart {...props} ref={ref} />
})
const ScatterPlotChart = React.forwardRef((props, ref) => {
  return <arcgis-charts-scatter-plot {...props} ref={ref} />
})
const HistogramChart = React.forwardRef((props, ref) => {
  return <arcgis-charts-histogram {...props} ref={ref} />
})
