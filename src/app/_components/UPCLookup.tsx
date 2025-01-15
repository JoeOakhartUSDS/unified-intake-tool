import { useEffect, useState } from "react";

interface UPCLookupProps {
  upc: string;
}

interface UPCResponse {
  ean: string;
  title: string;
  description: string;
  upc: string;
  brand: string;
  model: string;
  color: string;
  size: string;
  dimension: string;
  weight: string;
  category: string;
  asin: string;
  elid: string;
  images: string[];
}

export default function UPCLookup({ upc }: UPCLookupProps) {
  const [data, setData] = useState<UPCResponse | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (upc) {
      fetch("https://api.upcitemdb.com/prod/trial/lookup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: '{ "upc": "' + upc + '" }',
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        });
    }
  }, [upc]);

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No product information found</div>;

  return (
    <div>
      {data.images?.length > 0 && (
        <img src={data.images[0]} className="height-10" />
      )}
      <div>
        <strong>Product name:</strong> {data.title}
      </div>
      <div>
        <strong>Product category:</strong> {data.category}
      </div>
      <div>
        <strong>Product brand:</strong> {data.brand}
      </div>
      <div>
        <strong>Product description:</strong> {data.description}
      </div>
    </div>
  );
}
