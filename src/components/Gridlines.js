export default {
  name: 'Gridlines',
  functional: true,
  props: ['xRange', 'yRange', 'interval'],
  render (h, {props}) {
    const $gridlines = []
    const xStart = Math.ceil(props.xRange[0] / props.interval) * props.interval
    const xEnd = Math.floor(props.xRange[1] / props.interval) * props.interval
    const yStart = Math.ceil(props.yRange[0] / props.interval) * props.interval
    const yEnd = Math.floor(props.yRange[1] / props.interval) * props.interval
    for (let x = xStart; x <= xEnd; x += props.interval) {
      const attrs = {
        x1: x,
        x2: x,
        y1: yStart,
        y2: yEnd
      }
      $gridlines.push(h('line', {attrs}))
    }
    for (let y = yStart; y <= yEnd; y += props.interval) {
      const attrs = {
        x1: xStart,
        x2: xEnd,
        y1: y,
        y2: y
      }
      $gridlines.push(h('line', {attrs}))
    }
    return h('g', {class: 'gridlines'}, $gridlines)
  }
}
