import React from "react";
import { useSingleCharQuery } from "../../generated/graphql";
import { useRouter } from "next/router";

const Character = () => {
  const router = useRouter();

  const routeVar =
    typeof router.query.id === "undefined" ? "-1" : router.query.id.toString();

  const [{ data, fetching, error }] = useSingleCharQuery({
    variables: { id: routeVar },
    pause: routeVar === "-1",
  });

  if (!fetching && !data) {
    return <div>No character</div>;
  }

  return (
    <main>
      {fetching && !data ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div>{data?.character?.id}</div>
        </div>
      )}
    </main>
  );
};

export default Character;
