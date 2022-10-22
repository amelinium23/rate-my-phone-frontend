import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { setIsLoading, useStore } from '../../context'
import { getPricesOfDevice } from '../../services/PostFormService'
import { Price } from '../../types'
import { upperFirstLetter } from '../../utils/helperFunctions'

interface PostPricesContainerProps {
  deviceKey: string
}

export default function PostPricesContainer({
  deviceKey,
}: PostPricesContainerProps) {
  const { state, dispatch } = useStore()
  const [prices, setPrices] = useState<Record<string, Price>>({})

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setIsLoading(dispatch, true)
        const res = await getPricesOfDevice(deviceKey)
        setPrices(res)
      } catch (e) {
        toast.error((e as Error).message)
      } finally {
        setIsLoading(dispatch, false)
      }
    }
    fetchPrices()
  }, [deviceKey])

  return !state.isLoading ? (
    <>
      {Object.keys(prices).length > 0 ? (
        Object.entries(prices).map(([key, prices]) => (
          <div key={key} className="my-2">
            <span>Version: {key}</span>
            <ol>
              {Object.entries(prices).map(([key, value]) =>
                key === 'currency' ? null : (
                  <li key={key}>
                    {upperFirstLetter(key)}: {`${prices.currency}${value}`}
                  </li>
                )
              )}
            </ol>
          </div>
        ))
      ) : (
        <p className="mt-2">There is no price for this device</p>
      )}
    </>
  ) : null
}
