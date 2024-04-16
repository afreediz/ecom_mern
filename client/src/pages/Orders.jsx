import React from 'react'
import OrdersCard from '../components/utilities/OrdersCard'
import SidebarLayout from '../components/user/SidebarLayout'

const Orders = () => {
  return (
    <SidebarLayout>
      <h1>Your Orders : </h1>
      <div className="table w-full p-4">
        <table className='w-full border-2 border-black sketc'>
            <thead>
                <th className=' border border-black'>index</th>
                <th className=' border border-black'>status</th>
                <th className=' border border-black'>buyer</th>
                <th className=' border border-black'>date</th>
                <th className=' border border-black'>payment</th>
                <th className=' border border-black'>quantity</th>
            </thead>
            <tbody>
                <tr>
                  <td className=' border-r border-black'>1</td>
                  <td className=' border-r border-black'>pending</td>
                  <td className=' border-r border-black'>u</td>
                  <td>today</td>
                  <td className=' border-r border-black'>cash</td>
                  <td className=' border-r border-black'>1</td>
                </tr>
            </tbody>
        </table>
      </div>
      <div className="p-4">
        <OrdersCard />
        <OrdersCard />
      </div>
    </SidebarLayout>
  )
}

export default Orders
