import ProductCard from '@/components/ProductCard';

// This function run on the serveeeeeeeer
// 1000 Request per second (Perfect for SEO)
// SSR ( SEO )
// ISR (Incrementail static regernatrion)

// development (local)
// build

// tsx
// bundel (HTML - CSS - js) Build
interface Product {
  documentId: string;
}

const getProducts = async () => {
  const domain = 'https://pos.skyready.online';
  const url = domain + '/api/items';

  const res = await fetch(url, {
    next: { revalidate: 3600 },
  });

  const json = await res.json();
  return json.data;
};

export default async function ProductsPage() {
  const products: Product[] = (await getProducts()) || [];

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

//myCode - gitHub - Server ( Vercel - VPS - Shared Hosting )
