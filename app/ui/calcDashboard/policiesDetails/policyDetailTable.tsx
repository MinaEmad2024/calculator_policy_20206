import { PolicyDetail } from '@/app/lib/definitions';
import { UpdatePolicyDetail,DeletePolicyDetail } from '@/app/ui/calcDashboard/policiesDetails/buttons';

type PolicyDetialsTableProps = {
  policyDetails: PolicyDetail[]
}



export default async function PolicyDetialsTable({
  policyDetails,
  
}:PolicyDetialsTableProps) {

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {policyDetails?.map((PolicyDetail) => (
              <div
                key={PolicyDetail.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{PolicyDetail.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">deductables {PolicyDetail.deductables}</p>
                    <p className="text-sm text-gray-500">1st coIns-{PolicyDetail.coins}</p>
                    <p className="text-sm text-gray-500">max-{PolicyDetail.max}</p>
                    <p className="text-sm text-gray-500">min-{PolicyDetail.min}</p>
                    <p className="text-sm text-gray-500">2nd CoIns-{PolicyDetail.coins2}</p>
                    <p className="text-sm text-gray-500">3rd coIns-{PolicyDetail.coins3}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex justify-end gap-2">
                    <UpdatePolicyDetail id={PolicyDetail.id} />
                    <DeletePolicyDetail id={PolicyDetail.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Deductable
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  1st Co-Insurance
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Max
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Min
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  2nd Co-Insurance
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  3rd Co-Insurance
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white overflow-y-auto divide-y divide-gray-100">
              {policyDetails?.map((policydetail) => (
                <tr
                  key={policydetail.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none transition-colors hover:bg-blue-50 hover:text-blue-700 [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{policydetail.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {policydetail.deductables}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {policydetail.coins}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {policydetail.max}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {policydetail.min}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {policydetail.coins2}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {policydetail.coins3}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdatePolicyDetail id={policydetail.id} />
                      <DeletePolicyDetail id={policydetail.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
