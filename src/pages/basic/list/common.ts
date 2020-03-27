export interface Order {
  id: number
  name: string
  desc?: string
  type: 1 | 2 | 3
  status: 1 | 2 | 3 | 4
  price: number
}

export const enums = {
  status: {
    1: '待处理',
    2: '已完成',
    3: '退款中',
    4: '已退货',
  },
  type: {
    1: '官方订单',
    2: '京东订单',
    3: '自有订单',
  },
  statusColor: {
    1: 'processing',
    2: 'success',
    3: 'warning',
    4: 'error',
  },
}
