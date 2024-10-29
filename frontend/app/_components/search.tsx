import { SearchIcon } from "lucide-react"
import { Input } from "./ui/input"

interface SearchProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Search: React.FC<SearchProps> = ({ value, onChange }) => {
  return (
    <div className="relative flex w-full max-w-[400px] items-center max-md:max-w-none">
      <Input
        placeholder="Buscar NF, empresa..."
        className="w-full rounded-lg transition-all duration-75 focus-visible:outline-none"
        value={value}
        onChange={onChange}
      />
      <SearchIcon className="absolute right-2 h-6 w-6 text-gray-300" />
    </div>
  )
}

export default Search
