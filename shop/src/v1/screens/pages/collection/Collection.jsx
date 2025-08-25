import React, {useEffect, useState} from "react";
import CollectSkeleton from "../../../components/common/collection/CollectSkeleton";
import CollectCard from "../../../components/common/collection/CollectCard";

const Collection = ({items = []}) => {
  const [loading, setLoading] = useState(true);
  // mẫu dữ liệu demo nếu không truyền props
  const demo = loading
    ? items
    : [
        {title: "Men's", img: "images/collections/shop-cls/men-cls.jpg", count: 12},
        {title: "Women's", img: "images/collections/shop-cls/women-cls.jpg", count: 12},
        {title: "Kid's", img: "images/collections/shop-cls/kid-cls.jpg", count: 12},
        {title: "Jewelry", img: "images/collections/shop-cls/jewelry-cls.jpg", count: 12},
        {title: "Dresses", img: "images/collections/shop-cls/dresses-cls.jpg", count: 12},
        {title: "Tops", img: "images/collections/shop-cls/top-cls.jpg", count: 12},
        {title: "Bottoms", img: "images/collections/shop-cls/bottom-cls.jpg", count: 12},
        {title: "Outerwear", img: "images/collections/shop-cls/outerwear-cls.jpg", count: 12},
        {title: "Shoes", img: "images/collections/shop-cls/shoes-cls.jpg", count: 12},
        {title: "Bags", img: "images/collections/shop-cls/bags-cls.jpg", count: 12},
        {title: "Accessories", img: "images/collections/shop-cls/accessories-cls.jpg", count: 12},
        {title: "Lingerie", img: "images/collections/shop-cls/lingerie-cls.jpg", count: 12},
      ];
  // Chạy khi component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); // 2 giây

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4  w-full max-w-7xl h-full ">
        {/* grid 2 -> 4 cột */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {loading
            ? Array.from({length: 8}).map((_, i) => <CollectSkeleton key={i} />)
            : demo.map((c, i) => <CollectCard key={i} item={c} />)}
        </div>
      </div>
    </section>
  );
};

export default Collection;
