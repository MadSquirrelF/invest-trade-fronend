import Heading from "@/components/ui/heading/Heading";
import NotFoundBlock from "@/components/ui/NotFoundBlock/NotFoundBlock";
import Meta from "@/utils/meta/Meta";

export default function Error404() {
  return (
    <Meta title="Страница не найдена">
      <NotFoundBlock />
    </Meta>
  )
}