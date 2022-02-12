import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useCharachtersQuery } from "../generated/graphql";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import NextLink from "next/link";
import NextImage from "next/image";
import { Autocomplete, Box, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const Home = () => {
  const router = useRouter();

  const [{ data, fetching, error }] = useCharachtersQuery();

  const [searChar, setSearChar] = useState([] as any[]);

  console.log(router.query.url);

  if (!fetching && !data) {
    return <div>Something happened</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  useEffect(() => {
    return setSearChar(data?.characters!);
  }, [data]);

  // options.push(data?.characters);

  return (
    <main>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Char" />}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box width={"50%"} padding={5}>
          {fetching && !data ? (
            <div>Loading...</div>
          ) : (
            <Grid container spacing={4}>
              {data?.characters?.results?.map((c) => (
                <NextLink
                  key={c?.id}
                  href={"/character/[id]"}
                  as={`/character/${c?.id}`}
                >
                  <Grid item style={{ cursor: "pointer" }}>
                    <Box
                      width={250}
                      height={250}
                      position="relative"
                      overflow={"hidden"}
                      borderRadius={4}
                    >
                      <NextImage
                        //@ts-ignore
                        src={c!.image}
                        layout="fill"
                      />
                    </Box>
                    <Box>{c?.name}</Box>
                  </Grid>
                </NextLink>
              ))}
            </Grid>
          )}
        </Box>
      </div>
    </main>
  );
};

export default Home;
