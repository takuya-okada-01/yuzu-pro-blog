import { CardList } from "@/components/card_list";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { client } from "@/lib/client";
import { Blog } from "@/type/blog";
import { Tag } from "@/type/tag";

type Props = {
  blogs: Blog[];
  tags: Tag[];
};

export default function Home({ blogs, tags }: Props) {
  return (
    <>
      <Header />
      <div className="container mx-auto pt-5">
        <div className="flex space-x-5">
          <CardList blogs={blogs} />
          <Sidebar blogs={blogs} tags={tags} className="w-1/3" />
        </div>
      </div>
    </>
  );
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const blogs = await client.get({ endpoint: "blogs" });
  const tags = await client.get({ endpoint: "tags" });

  return {
    props: {
      blogs: blogs.contents,
      tags: tags.contents,
    },
  };
};
