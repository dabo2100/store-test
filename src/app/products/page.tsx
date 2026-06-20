import ProductCard from '@/components/ProductCard';

// This function run on the serveeeeeeeer
// 1000 Request per second (Perfect for SEO)
// SSR ( SEO )
// ISR (Incrementail static regernatrion)

// development (local)
// build

const getProducts = async () => {
  const domain = 'https://pos.skyready.online';
  const url = domain + '/api/items';

  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  const json = await res.json();
  return json.data;
};

export default async function ProductsPage() {
  const products = (await getProducts()) || [];

  return (
    <div className="w-full flex justify-center py-4">
      <div className="container grid grid-cols-3 gap-4">
        {products?.map((el) => (
          <ProductCard key={el.documentId} />
        ))}
      </div>
    </div>
  );
}
