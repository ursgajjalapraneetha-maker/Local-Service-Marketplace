import { request } from './api'

const earningService = {
  getOverview(params) {
    return request('/provider/earnings/overview', { params })
  },

  getTransactions(params) {
    return request('/provider/earnings/transactions', { params })
  },

  getTransactionById(id) {
    return request(`/provider/earnings/transactions/${id}`)
  },

  getRevenueChart(params) {
    return request('/provider/earnings/revenue', { params })
  },

  getWallet() {
    return request('/provider/wallet')
  },

  requestWithdrawal(data) {
    return request('/provider/wallet/withdraw', { method: 'POST', body: data })
  },

  getWithdrawalHistory(params) {
    return request('/provider/wallet/withdrawals', { params })
  },

  getInvoices(params) {
    return request('/provider/earnings/invoices', { params })
  },
}

export default earningService
