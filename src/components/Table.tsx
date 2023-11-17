export const Table: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <table className="border border-gray-200 table-fixed 2xl:w-full min-w-max dark:border-slate-600 rounded-md">
    {children}
  </table>
}

export const TableHead: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <thead className="bg-gray-50 dark:bg-slate-800 rounded-t-md">
    {children}
  </thead>
}

export const TableBody: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <tbody className="divide-y divide-gray-200 dark:divide-slate-600 dark:bg-slate-950">
    {children}
  </tbody>
}

export const TableRow: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <tr className="even:bg-slate-100 even:dark:bg-slate-900">
    {children}
  </tr>
}

export const TableHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white">
    {children}
  </th>
}

export const TableCell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <td className="px-6 py-4 whitespace-nowrap ">
    {children}
  </td>
}
