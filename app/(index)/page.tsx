import { getListings } from "@/api";
import { ListingItem, ListingsContainer } from "@/components";

export default function IndexPage() {
  const listings = getListings();

  return (
    <section className="px-10">
      <ListingsContainer>
        {listings.map((listing) => (
          <ListingItem key={listing.ref} item={listing} />
        ))}
      </ListingsContainer>
    </section>
  );
}
