import { AppSidebar } from '~/features/admin/components/AppSidebar'
import { ChartAreaInteractive } from '~/features/admin/components/ChartAreaInteractive'
import { DataTable } from '~/features/admin/components/DataTable'
import { SectionCards } from '~/features/admin/components/SectionCards'
import { SiteHeader } from '~/features/admin/components/SiteHeader'
import { SidebarInset, SidebarProvider } from '~/shared/components/ui/sidebar'
import data from './data.json'

export default function Dashboard() {
  return (
    <SidebarProvider
      style={
        // oxlint-disable-next-line typescript/no-unsafe-type-assertion
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
