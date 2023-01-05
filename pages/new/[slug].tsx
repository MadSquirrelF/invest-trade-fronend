import SingleNew from "@/components/screens/SinglePages/single-new/SingleNew";
import { NewService } from "@/services/new.service";
import { INew } from "@/shared/types/product.types";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Error404 from "../404";

const SingleNewPage: NextPage<{ item: INew | undefined }> = ({ item }) => {
  return item ? (
    <SingleNew item={item} />
  ) : (<Error404 />)
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { data: news } = await NewService.getAll()
    const paths = news.map((item) => ({
      params: {
        slug: item.slug
      }
    }))

    return { paths, fallback: 'blocking' }

  } catch {
    return {
      paths: [],
      fallback: false,
    }
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const { data: item } = await NewService.getBySlug(String(params?.slug))
    return {
      props: { item },
      revalidate: 60,
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
export default SingleNewPage