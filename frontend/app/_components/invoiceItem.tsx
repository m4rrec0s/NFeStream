import { Content } from "../_interfaces/dataInterface"

interface InvoiceItemProps {
  invoice: Content
}

const InvoiceItem = ({ invoice }: InvoiceItemProps) => {
  return <div key={invoice.id} className=""></div>
}

export default InvoiceItem
