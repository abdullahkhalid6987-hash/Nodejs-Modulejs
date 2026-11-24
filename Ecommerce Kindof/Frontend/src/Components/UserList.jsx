import { useEffect, useState } from 'react';
import { getAllUsers } from '../Services/Admin';

function UsersList() {
  // Static state layout data containing sample users, credentials, and nested order records
  const [users, setUsers] = useState([]);

  const getUsers = async () =>{
    try {
      const response = await getAllUsers()
      setUsers(response.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  if(users.length === 0){
    return
  }


  return (
    <div className="w-full max-w-5xl mx-auto bg-[#FBF9F6] px-8 py-12 font-sans">
      
      {/* Structural Context Header */}
      <div className="border-b border-stone-200/60 pb-6 mb-10">
        <h1 className="text-2xl font-extrabold tracking-[0.15em] text-stone-800 uppercase mb-1">
          Studio Customer Registry
        </h1>
        <p className="text-xs text-stone-500 tracking-wide">
          Overview of registered customer members and their structural order status records.
        </p>
      </div>

      {/* DESKTOP VIEW: Structured Table Layout */}
      <div className="hidden md:block overflow-x-auto border border-stone-200/60 rounded-md bg-white/40 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-stone-200/80 bg-stone-100/50 text-[10px] uppercase font-bold tracking-widest text-stone-700">
              <th className="px-6 py-4">Username</th>
              <th className="px-6 py-4">Email Address</th>
              <th className="px-6 py-4">Order Item List Summary</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 text-xs text-stone-800">
            {users.length > 0 ? users.map((user) => (
              <tr key={user._id} className="hover:bg-white transition-colors">
                <td className="px-6 py-4 font-bold tracking-wide text-stone-900">
                  {user.username}
                </td>
                <td className="px-6 py-4 text-stone-600">
                  {user.email}
                </td>
                <td className="px-6 py-4">
                  {user.order.length > 0 ? (
                    <ul className="space-y-1.5 list-disc list-inside text-stone-600">
                      {user.order.map((order) => (
                        <li key={order._id} className="text-[11px] leading-relaxed">
                          <span className="font-semibold text-stone-800">{order.name}</span> 
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-[11px] text-stone-400 italic tracking-wide">No active order history</span>
                  )}
                </td>
              </tr>
            )) : <div className='text-center text-md'>No Users</div>}
          </tbody>
        </table>
      </div>

      {/* MOBILE VIEW: Individual Responsive Cards Layout */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {users.map((user) => (
          <div key={user._id} className="bg-white border border-stone-200/60 rounded-md p-5 shadow-sm space-y-3">
            <div>
              <div className="text-[9px] uppercase font-bold tracking-widest text-stone-400 mb-0.5">Username</div>
              <div className="text-xs font-bold text-stone-900">{user.username}</div>
            </div>
            
            <div>
              <div className="text-[9px] uppercase font-bold tracking-widest text-stone-400 mb-0.5">Email</div>
              <div className="text-xs text-stone-600 break-all">{user.email}</div>
            </div>

            <div className="pt-2 border-t border-stone-100">
              <div className="text-[9px] uppercase font-bold tracking-widest text-stone-400 mb-2">Orders</div>
              {user.order.length > 0 ? (
                <ul className="space-y-2">
                  {user.order.map((order) => (
                    <li key={order._id} className="text-[11px] leading-tight text-stone-700 bg-stone-50 p-2 rounded-xs border border-stone-100">
                      <div className="font-semibold text-stone-800">{order.name}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-[11px] text-stone-400 italic">No active order history</div>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default UsersList;
