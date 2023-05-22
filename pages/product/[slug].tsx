import { errorCatch } from "api/api.helper";
import { getProductUrl } from "config/url.config";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import SingleProduct from "@/components/screens/SinglePages/single-product/SingleProduct";
import { IGalleryItem } from "@/components/ui/gallery/gallery.types";
import { ProductService } from "@/services/product.service";
import { IProduct } from "@/shared/types/product.types";
import Error404 from "../404";

const SingleProductPage: NextPage<{
  product: IProduct | undefined;
  similarProducts: IGalleryItem[];
}> = ({ product, similarProducts }) => (product ? (
  <SingleProduct
    product={product}
    similarProducts={similarProducts}
  />
) : (
  <Error404 />
));

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { data: products } = await ProductService.getAll();
    const paths = products.data.map((product) => ({
      params: { slug: product.slug },
    }));
    return {
      paths,
      fallback: `blocking`,
    };
  } catch {
    return {
      paths: [],
      fallback: false,
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const { data: product } = await ProductService.getBySlug(String(params?.slug));

    const responseSimilarProducts = await ProductService.getByCategory(
      product.category.map((cat) => cat._id),
    );

    const similarProducts: IGalleryItem[] = responseSimilarProducts.data
      .filter((p) => p._id !== product._id)
      .map((p) => ({
        name: p.title,
        posterPath: p.image,
        url: getProductUrl(p.slug),
      }));

    return {
      props: {
        product,
        similarProducts,
      },
      revalidate: 60,
    };
  } catch (e) {
    errorCatch(e);

    return {
      notFound: true,
    };
  }
};

export default SingleProductPage;
