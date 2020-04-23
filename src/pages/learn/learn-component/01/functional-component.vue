<script>
export default {
  functional: true,
  name: 'FunctionalComponent',
  render(h, context) {
    console.log(context.props)
    console.log(context.scopedSlots)
    const defaultSlot = context.scopedSlots.default(context.props)
    const xxxSlot = context.scopedSlots.xxx({ c: 1 })
    return h('div', [defaultSlot, xxxSlot])
  }
}

</script>
