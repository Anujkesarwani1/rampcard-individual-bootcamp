import { Rows } from 'utils/types'
import { API } from '../api'

export const retrieveTransactionData = async () => {
  const detailsResponse = await API.get('transaction/details')
  const transactionDetailsArray = detailsResponse.data

  const transformedTransactions: Rows[] = transactionDetailsArray.map(
    (transactionDetails: any) => {
      const transformedTransaction: Rows = {
        id: transactionDetails.id,
        brand: {
          label: transactionDetails.brand.label,
          sublabel: transactionDetails.brand.subLabel,
        },
        amount: transactionDetails.amount,
        date: transactionDetails.date,
        user: {
          name: transactionDetails.user.name,
          virtual: transactionDetails.user.virtualName,
        },
        quickBooksCategory: transactionDetails.quickBooksCategory,
        receipt: transactionDetails.receipt,
        memo: transactionDetails.memo,
        sync: transactionDetails.sync,
      }

      return transformedTransaction
    }
  )

  return transformedTransactions
}
