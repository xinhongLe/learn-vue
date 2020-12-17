export const tableItems = [
  {
    label: '序号',
    type: 'index'
  }, {
    label: '选择',
    type: 'selection'
  }, {
    parent1: '开发预售阶段',
    type: 'money',
    label: '税金',
    key: 'tax'
  }, {
    parent1: '开发预售阶段',
    label: '税负率',
    key: 'rate'
  }, {
    parent2: '利润专家小组阶段',
    parent1: '税金',
    label: '测试1',
    key: 'test1'
  }, {
    parent2: '利润专家小组阶段',
    parent1: '税金',
    label: '测试2',
    key: 'test2'
  }, {
    parent2: '利润专家小组阶段',
    parent1: '税负率',
    label: '测试3',
    key: 'test3'
  }, {
    parent2: '利润专家小组阶段',
    parent1: '税负率',
    label: '测试4',
    key: 'test4'
  }, {
    type: 'edit',
    label: '编辑',
    key: 'testedit',
    blurMethod: 'blurred'
  }, {
    type: 'select',
    label: '过滤',
    key: 'testselect',
    options: [
      {
        label: 'filter1', value: 1
      }, {
        label: 'filter2', value: 2
      }
    ]
  }, {
    type: 'operation',
    label: '操作栏',
    buttons: [
      {
        type: 'operate',
        text: '详情',
        methodName: 'exportTable'
      }
    ]
  }
]
