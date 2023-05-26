type Props = {
  children: React.ReactNode;
  onClick: () => void;
};

export function ButtonOutline({ children, onClick }: Props) {
  return (
    <button
      type="button"
      className="rounded-md border border-black mt-3 px-6 py-3 hover:bg-gray-100 font-semibold"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
