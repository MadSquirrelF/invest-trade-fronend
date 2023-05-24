import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import SingleWork from "@/components/screens/SinglePages/single-work/SingleWork";
import { WorkService } from "@/services/work.service";
import { IWork } from "@/shared/types/product.types";
import Error404 from "../404";

const SingleWorkPage: NextPage<{ item: IWork | undefined }> = ({ item }) => (item ? (
  <SingleWork item={item} />
) : (<Error404 />));

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { data: works } = await WorkService.getAll();
    const paths = works.map((item) => ({
      params: {
        slug: item.slug,
      },
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
    const { data: item } = await WorkService.getBySlug(String(params?.slug));
    return {
      props: { item },
      revalidate: 60,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
export default SingleWorkPage;
