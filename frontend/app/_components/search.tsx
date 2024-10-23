import { Input } from "./ui/input"

interface SearchProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Search: React.FC<SearchProps> = ({ value, onChange }) => {
  return (
    <Input
      placeholder="Buscar NF, empresa..."
      className="w-full max-w-[400px] rounded-lg focus-visible:border-gray-500 max-md:max-w-none"
      value={value}
      onChange={onChange}
    />
  )
}

export default Search
