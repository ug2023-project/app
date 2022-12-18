const Placeholder = ({ depth }: PlaceholderProps) => {
  const left = depth * 24
  return <div className="absolute right-0 top-0 h-[2px] -translate-y-1/2 bg-[#1967d2]" style={{ left }}></div>
}

type PlaceholderProps = {
  depth: number
}

export default Placeholder
