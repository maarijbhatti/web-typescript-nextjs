import { withUrqlClient } from "next-urql";
import { NavBar } from "../components/NavBar";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const [{ data }] = usePostsQuery();

  return (
    <>
      <NavBar />
      <div>hello world</div>
      {!data ? (
        <div>Loading...</div>
      ) : (
        data.posts.map((value) => <div>{value.title}</div>)
      )}
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
